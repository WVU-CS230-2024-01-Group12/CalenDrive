import InteractiveCalendar from '../InteractiveCalendar.js';
import UserLogin from '../UserLogin';

function MainPage() {
    return (
        <div>
            <h1 className="text-center mt-3">Interactive Calendar</h1>
            <UserLogin />
            <InteractiveCalendar />
        </div>
    );
}

export default MainPage;