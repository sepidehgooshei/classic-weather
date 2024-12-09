import { getWeatherIcon, formatDay } from '../components/utils';

function Day({ date, max, min, code, isToday }) {
    return (
<li className={`card p-3 text-center ${isToday ? "bg-warning" : "bg-light"}`}>
  <span className="display-4">{getWeatherIcon(code)}</span>
  <p className="mb-1">{isToday ? "Today" : formatDay(date)}</p>
  <p className="fw-bold">
    {Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)}&deg;</strong>
  </p>
</li>

    );
}

export default Day