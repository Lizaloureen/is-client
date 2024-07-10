import React from "react";
import FireTableRow from "./FireTableRow";

const FireTable = ({ firearmsData }) => {
  return (
    <table className="applications-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Type</th>
          <th>Serial No.</th>
          <th>Man.</th>
          <th>Man. On</th>
          <th>Vendor</th>
          <th>Description</th>
          <th>Status</th>
          <th>Approval</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {firearmsData?.map((firearm, key) => (
          <FireTableRow key={key} firearm={firearm} />
        ))}
      </tbody>
    </table>
  );
};

export default FireTable;
