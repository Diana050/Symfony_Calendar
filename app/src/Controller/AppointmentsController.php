<?php

namespace App\Controller;

use App\Entity\Appointments;
use App\Entity\Locations;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppointmentsController extends AbstractController
{
    #[Route('/appointments', name: 'app_appointments')]
    public function index(Request $request, EntityManagerInterface $db): Response
    {

        $location = $db->getRepository(Locations::class)->findOneBy([
            'id' => $request->request->get('location'),
        ]);

        if ($this->validateDateAndLocation($request, $db, $this->getUser())) {
            $appointment = new Appointments();
            $appointment->setIdUser(
                $this->getUser()
            );
            $appointment->setIdLocations(
                $location
            );
            $appointment->setDate(\DateTime::createFromFormat('Y-m-d', $request->request->get('date')));

            $db->persist($appointment);
            $db->flush();

        }
        return $this->redirectToRoute('home');
    }

    private function validateDateAndLocation($request, $db, $user): bool
    {
        $currentLocation = $db->getRepository(Locations::class)->find($request->request->get('location'));

        $numberOfAppointmentsToday = $db->getRepository(Appointments::class)->count([
            'date' => \DateTime::createFromFormat('Y-m-d', $request->request->get('date')),
            'id_user' => $user->getId()
        ]);


        $numberOfAppointmentsInSelectedDay = $db->getRepository(Appointments::class)->count([
            'date' => \DateTime::createFromFormat('Y-m-d', $request->request->get('date')),
            'id_location_id' => $currentLocation
        ]);

        if (new \DateTime('today') > \DateTime::createFromFormat('Y-m-d', $request->request->get('date'))) {
            $this->flash->now('error', 'Please select a future day!');
            return false;
        } else if ($numberOfAppointmentsInSelectedDay >= $currentLocation->getCapacity()) {
//          $this->flash->now('error', 'Unfortunately there are no more places available for you!');
            return false;
        } else if ($numberOfAppointmentsToday > 0) {
//           $this->flash->now('error', 'You have already made an appointment for this date or this location!');
            return false;
        } else
            return true;
    }
}
