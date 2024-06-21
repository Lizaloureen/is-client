const Firearms = () => {
    return (
      <div>
          <h3>Firearms</h3>
          <div className="grider">
              <div className="card">
              <div className="card-body">
                  <div className="title">0</div>
                  <div className="sub-text">Number of firearms owned</div>
              </div>
              </div>
          </div>
          <br />
          <h3>My Firearms</h3>
          <table>
              <thead>
                  <tr>
                      <th>Firearm number</th>
                      <th>Firearm Type</th>
                      <th>Firearm Serial Number</th>
                      <th> Status</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>1</td>
                      <td>Shotgun</td>
                      <td>SQ76TL</td>
                      <td>Currently owning</td>
                  </tr>
              </tbody>
          </table>
      </div>
    );
  }
  
  export default Firearms;