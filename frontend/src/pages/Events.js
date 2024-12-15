import { useLoaderData , json , defer , Await  } from 'react-router-dom';
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

// You can useLoaderData() hook in the element that's assigned to a route AND 
// in all components that might be used inside that element. 

function EventsPage() {
  const { events } = useLoaderData();

  return (
  <Suspense fallback={<p style={{ textAlign: 'center'}}>Loading....</p>}>
  <Await resolve={events}>
    {(loadedEvents) => <EventsList events={loadedEvents}/>}
  </Await>
  </Suspense>
  );
}

export default EventsPage;


async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // ...
    // throw new Response(JSON.stringify({ message : 'Could not fetch events.'}), {
    //   status : 500
    // });
    throw json({message : 'Could not fetch events.'} , {status : 500});
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader() {
  return defer({
    events : loadEvents()
  });
}