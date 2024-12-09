import Day from "./Day";
function Weather({ weather, location }) {
    const {
        temperature_2m_max: max,
        temperature_2m_min: min,
        time: dates,
        weathercode: codes,
    } = weather;
    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title text-center">Weather in {location}</h2>
                <ul className="list-group list-group-flush">
                    {dates.map((date, i) => (
                        <Day
                            date={date}
                            max={max.at(i)}
                            min={min.at(i)}
                            code={codes.at(i)}
                            key={date}
                            isToday={i === 0}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default Weather;