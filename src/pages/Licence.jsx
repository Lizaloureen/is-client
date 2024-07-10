import React, { useEffect, useState } from "react";
import { getToken } from "../utils/helpers";
import axios from "axios";
import Modal from "../components/Modal";

const Licence = () => {
  const [licences, setLicences] = useState([]);
  const [trans_id, settrans_id] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(undefined);
  const [appId, setAppId] = useState("");

  const openModal = (modalId, id) => {
    setIsModalOpen(modalId);
    setAppId(id);
  };

  const closeModal = () => {
    setIsModalOpen(undefined);
  };

  const getLicences = async () => {
    const token = getToken();

    const res = await axios.get("http://127.0.0.1:8000/client/licences", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    const data = res.data;
    setLicences(data);
  };

  useEffect(() => {
    getLicences();
  }, []);

  const handleRenewalPayment = async (e) => {
    e.preventDefault();
    const token = getToken();

    if (!trans_id) return alert("Please enter transaction ID");
    const url = `http://localhost:8000/client/licences/renew`;
    try {
      const formData = {
        id: appId,
        trans_id: trans_id,
      };
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      const data = response.data;
      console.log(data);
      if (data.success) {
        alert(data.message);
        closeModal();
        navigate(0);
      }
      // Update the applications state
    } catch (error) {
      console.error("Error renewing licence", error);
    }
  };

  return (
    <div>
      <div className="flex-apart" style={{ marginBottom: "10px" }}>
        <h3>My Licences</h3>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Client Name</th>
              <th>Application</th>
              <th>Serial Number</th>
              <th>Status</th>
              <th>Issued On</th>
              <th>Expires On</th>
              <th>Renewed On</th>
              <th>Revoked On</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {licences?.data?.map((licence, key) => (
              <tr key={key + 1}>
                <td>{key + 1}</td>
                <td>
                  {licence?.client?.first_Name} {licence?.client?.last_Name}
                </td>
                <td>{licence.application.id}</td>
                <td>{licence.license_number}</td>
                <td>{licence.status}</td>
                <td>
                  {licence.issued_on
                    ? new Date(licence.issued_on).toLocaleString()
                    : "--"}
                </td>
                <td>
                  {licence.expiry_on
                    ? new Date(licence.expiry_on).toLocaleString()
                    : "--"}
                </td>
                <td>
                  {licence.renewed_on
                    ? new Date(licence.renewed_on).toLocaleString()
                    : "--"}
                </td>
                <td>
                  {licence.revoked_on
                    ? new Date(licence.revoked_on).toLocaleString()
                    : "--"}
                </td>
                <td>
                  {licence.status == "Expired" ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <button
                        onClick={() =>
                          openModal(`pay_${licence.id}`, licence.id)
                        }
                      >
                        Renew Payment
                      </button>
                    </div>
                  ) : licence.status == "Awaiting Payment Approval" ? (
                    <p style={{ color: "orange" }}>{licence.status}</p>
                  ) : licence.status == "Awaiting Interview" ? (
                    <p style={{ color: "red" }}>{licence.status}</p>
                  ) : licence.status == "Revoked" ? (
                    <p style={{ color: "red" }}>{licence.status}</p>
                  ) : (
                    <p style={{ color: "green" }}>{licence.status}</p>
                  )}

                  {isModalOpen == `pay_${licence.id}` && (
                    <Modal
                      id={licence.id}
                      isOpen={isModalOpen}
                      onClose={closeModal}
                    >
                      <p style={{ fontSize: "12px" }}>
                        Licence Renewal payment on license{" "}
                        {licence.license_number}.
                      </p>{" "}
                      <br />
                      <p
                        className=" m-4"
                        style={{ fontSize: "12px", padding: "20px" }}
                      >
                        <ul>
                          <li>Select M-PESA.</li>
                          <li>Select Lipa Na M-PESA.</li>
                          <li>Select Pochi La Biashara.</li>
                          <li>Enter the 0725866671</li>
                          <li>Enter the amount: 2000</li>
                          <li>Enter M-PESA PIN.</li>
                          <li>Enter the transaction ID below</li>
                        </ul>
                      </p>
                      <form
                        onSubmit={handleRenewalPayment}
                        style={{
                          margin: "0px",
                          padding: "0px",
                          border: "none",
                          width: "100%",
                        }}
                      >
                        <div className="form-group">
                          <label htmlFor="trans_id">
                            Enter Mpesa Transaction ID
                          </label>
                          <input
                            style={{
                              padding: "10px",
                              width: "95%",
                              borderRadius: "5px",
                              backgroundColor: "white",
                              border: "1px solid #ccc",
                            }}
                            name="trans_id"
                            value={trans_id}
                            onChange={(e) => settrans_id(e.target.value)}
                            type="text"
                            placeholder="Transaction ID"
                          />
                        </div>
                        <input
                          type="submit"
                          value="Renew Licence"
                          className="button"
                          style={{ backgroundColor: "green" }}
                        />
                      </form>
                    </Modal>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Licence;
