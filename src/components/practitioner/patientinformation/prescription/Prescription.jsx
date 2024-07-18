import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Table, Container } from "react-bootstrap";
import axios from "axios";
import "./PrescriptionStyle.css";

function Prescription({ patientId, appointmentId, doctorId }) {
  const [medication, setMedication] = useState({
    name: "",
    type: "",
    instruction: "",
  });
  const [medications, setMedications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/doctor/api/getPrescription/${patientId}/${doctorId}`
        );
        if (response.data) {
          setMedications(response.data.medications);
        }
      } catch (err) {
        console.log("Error fetching prescription:", err);
      }
    };

    fetchPrescription();
  }, [patientId, doctorId]);

  const handleMedicationChange = (field, value) => {
    setMedication({ ...medication, [field]: value });
  };

  const addMedication = () => {
    if (medication.name && medication.type && medication.instruction) {
      setMedications([...medications, medication]);
      setMedication({ name: "", type: "", instruction: "" });
    } else {
      setError("Please fill in all fields");
    }
  };

  const removeMedication = (index) => {
    const newMedications = medications.filter((_, i) => i !== index);
    setMedications(newMedications);
  };

  const handleSubmit = async () => {
    try {
      const prescriptionData = {
        patient: patientId,
        doctor: doctorId,
        medications,
      };

      await axios.post(
        `http://localhost:8000/doctor/api/createPrescription/${patientId}/${appointmentId}`,
        prescriptionData
      );
      window.alert("Prescription saved successfully!");
    } catch (err) {
      console.log(err);
      setError("Error saving prescription");
    }
  };

  return (
    <>
      <div className="prescription-main">
        <h1>Create Prescription</h1>
        <p>Appointment ID: {appointmentId}</p>

        <div className="prescription-form">
          <div className="prescription-preview">
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Name of Drug</Form.Label>
                    <Form.Control
                      type="text"
                      value={medication.name}
                      onChange={(e) =>
                        handleMedicationChange("name", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Type of Drug</Form.Label>
                    <Form.Control
                      type="text"
                      value={medication.type}
                      onChange={(e) =>
                        handleMedicationChange("type", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Instructions</Form.Label>
                    <Form.Control
                      type="text"
                      value={medication.instruction}
                      onChange={(e) =>
                        handleMedicationChange("instruction", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                  <Button style={{justifyContent: 'center'}} variant="secondary" onClick={addMedication}>
                  Add Medication
                  </Button>
              </div>
              
              {error && <p>{error}</p>}
            </Form>
          </div>
          
        </div>
        <div className="prescription-previewmain">
        <div className="prescription-preview">
          <h2>Preview</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name of Drug</th>
                <th>Type of Drug</th>
                <th>Instructions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {medications.map((med, index) => (
                <tr key={index}>
                  <td>{med.name}</td>
                  <td>{med.type}</td>
                  <td>{med.instruction}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => removeMedication(index)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button variant="primary" onClick={handleSubmit}>
            Save Prescription
          </Button>
        </div>
       
        </div>
        
      </div>
    </>
  );
}

export default Prescription;
