<?php

namespace App\Controller;

use App\Entity\Appointments;
use App\Entity\Locations;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    #[Route('/', name: 'home')]
    public function index(Request $request, EntityManagerInterface $db): Response
    {
        $getParams = $request->query->get('date') ?? null;
        $appointments = [];

        $locations = $db->getRepository(Locations::class)->findAll();
        if ($getParams) {

            $date = $getParams;

            $appointments = $db->getRepository(Appointments::class)->findBy([
                'date' => \DateTime::createFromFormat('Y-m-d', $date),
            ]);

        }

        $selctedLocation = $db->getRepository(Locations::class)->findOneBy([
            'id' => $request->query->get('location'),
        ]) ?? $db->getRepository(Locations::class)->findOneBy(["id" => 1]);

        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
            'locations' => $locations,
            'appointments' => $appointments,
            'date' => $date ?? strval(date("Y-m-d")),
            'selectedLocation' => $selctedLocation,
        ]);
    }


}