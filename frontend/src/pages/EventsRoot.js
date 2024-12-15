import EventsNavigation from '../components/EventsNavigation';
import { Outlet } from 'react-router-dom';

function EventsRootLayout() {
    return (
        <>
        <EventsNavigation/>
        <main>
            <Outlet />
        </main>
        </>
    )
}

export default EventsRootLayout;