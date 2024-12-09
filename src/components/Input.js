
function Input({ location, onChangeLocation }) {
    return (
        <div className="mb-3">
        <input
            type="text"
            className="form-control"
            placeholder="Search for a location..."
            value={location}
            onChange={onChangeLocation}
        />
    </div>
      
    );
}
 export default Input;