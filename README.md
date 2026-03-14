# 💖 ElderEase – Intelligent Senior Health Monitoring System
---

## 📄 Abstract

ElderEase is a **real-time health monitoring system** designed to track and analyze vital health parameters of elderly individuals. The system monitors key physiological indicators such as **heart rate, oxygen saturation (SpO₂), and body temperature**.

The platform processes health data through **validation, rule-based classification, monitoring, and visualization modules** to detect abnormal health conditions and assist caregivers in monitoring elderly health remotely.

ElderEase follows a **modular and scalable architecture** that supports progressive system expansion including **backend APIs, database integration, advanced frontend dashboards, AI-driven health analytics, and IoT-based health sensors**.

---

# 🎯 Problem Statement

Elderly individuals living independently are vulnerable to several health risks such as:

- sudden heart rate abnormalities  
- low oxygen saturation levels  
- fever episodes  
- lack of continuous health monitoring  

Traditional healthcare monitoring systems are often **reactive and require manual supervision**.

ElderEase aims to build a **scalable real-time monitoring system** capable of detecting abnormal health conditions and enabling caregivers to remotely monitor elderly individuals.

---

# 🏗️ System Architecture

The ElderEase platform follows a **layered modular architecture** designed for progressive development across multiple system phases.

```
Vital Data Simulation
(Node-RED)
↓
Data Validation
↓
Decision Engine
↓
Backend API Layer (Phase 2 – In Development)
↓
Database Storage (Phase 3)
↓
Frontend Monitoring Dashboard (Phase 4)
↓
AI / ML Health Analytics (Phase 5)
↓
IoT Sensor Integration
```

---

## Architecture Characteristics

- Modular layered system design  
- Event-driven health monitoring architecture  
- Flow-based data processing using Node-RED  
- API-driven backend communication layer  
- Scalable infrastructure for AI and IoT integration  

---

# 🔄 Current Prototype Workflow (Phase 1)

## 1️⃣ Vital Data Simulation

Node-RED generates simulated health readings including:

- heart rate  
- oxygen saturation (SpO₂)  
- body temperature  

These readings mimic data produced by wearable health monitoring devices.

---

## 2️⃣ Data Validation

Incoming readings are checked against **physiological ranges** to ensure realistic data values.

Example ranges:

| Parameter | Range |
|----------|-------|
Heart Rate | 40 – 180 bpm |
SpO₂ | 70 – 100 % |
Temperature | 34 – 42 °C |

Invalid readings are flagged and prevented from entering further processing stages.

---

## 3️⃣ Decision Engine

Validated health readings are processed through **rule-based classification logic**.

Health states include:

- **NORMAL**
- **WARNING**
- **EMERGENCY**

The decision engine detects abnormal physiological conditions and triggers alerts when necessary.

---

## 4️⃣ Monitoring & Logging

The system tracks monitoring metrics including:

- total readings processed  
- warning events detected  
- emergency events detected  

This allows system-level monitoring and operational analysis.

---

## 5️⃣ Dashboard Visualization

Health data is displayed using the **Node-RED dashboard**, providing real-time monitoring through:

- heart rate gauges  
- SpO₂ gauges  
- temperature gauges  
- health status indicators  
- monitoring charts  

The dashboard updates automatically every **5 seconds**.

---

# 📊 System Architecture Diagram

![System Architecture](docs/images/hardware-system-architecture.png)

### System Workflow

1. **Health Sensors (Future Hardware Layer)**  
   Heart rate, SpO₂, and temperature sensors collect physiological readings.

2. **IoT Microcontroller**  
   ESP32-based microcontroller processes sensor readings.

3. **Wireless Transmission**  
   Health data is transmitted via WiFi to the backend server.

4. **Backend Server**  
   Node.js + Express APIs process health monitoring data.

5. **Database Storage**  
   MongoDB stores health records and monitoring history.

6. **Caregiver Dashboard**  
   Displays real-time patient health information.

⚠ The current prototype uses **simulated health data generated through Node-RED**.

---

# 🛠️ Technology Stack

| Layer | Technology | Purpose |
|------|-------------|---------|
| Runtime | Node.js | Runs Node-RED environment |
| Core Engine | Node-RED | Flow-based health data simulation |
| Programming | JavaScript | System logic implementation |
| Data Format | JSON | Structured health data exchange |
| Backend | Express.js (In Development) | API layer for system integration |
| Database | MongoDB (Phase 3) | Persistent health record storage |
| UI | Node-RED Dashboard / React (Phase 4) | Monitoring interface |
| Version Control | Git + GitHub | Project version management |

---

# 🚀 Project Development Phases

## Phase 1 – Monitoring Prototype (Completed)

Implemented modules:

- Vital data simulation  
- Data validation  
- Rule-based decision engine  
- Monitoring and logging system  
- Real-time dashboard visualization  

The prototype demonstrates **real-time health monitoring through simulated sensor data**.

---

## Phase 2 – Backend Infrastructure (In Development)

This phase introduces backend services responsible for system integration.

Planned features include:

- Node.js + Express backend APIs  
- health data processing endpoints  
- communication between system modules  
- dashboard API integration  

---

## Phase 3 – Database Integration

This phase introduces persistent health data storage.

Planned features include:

- MongoDB health record database  
- storage of historical patient health data  
- retrieval of monitoring history  
- health analytics data support  

---

## Phase 4 – Advanced Frontend Dashboard

A dedicated web-based monitoring interface will be developed.

Planned features include:

- React-based monitoring dashboard  
- real-time health visualization  
- patient monitoring panels  
- role-based authentication system  

---

## Phase 5 – AI / ML Health Analytics

This phase introduces intelligent healthcare analytics.

Planned capabilities include:

- anomaly detection models  
- predictive health risk scoring  
- early warning health analytics  
- automated health insights  

---

## Phase 6 – IoT Sensor Integration

Future versions of ElderEase may integrate real hardware sensors.

Example hardware pipeline:

```
Health Sensors
(Heart Rate / SpO₂ / Temperature)
↓
ESP32 Microcontroller
↓
WiFi Data Transmission
↓
Backend Server
↓
MongoDB Database
↓
Caregiver Dashboard
```


---

# 👥 Project Team

## Aadya Patel  
**Role:** Frontend Development & AI/ML Integration

Responsibilities:

- system architecture design  
- dashboard development  
- health data visualization  
- AI-based health analytics research  

---

## Ananya Mishra  
**Role:** Database Design & Monitoring Systems

Responsibilities:

- MongoDB database architecture  
- monitoring and logging infrastructure  
- persistent health data management  

---

## Anish Kushwaha  
**Role:** Backend Development & API Integration

Responsibilities:

- backend API development using Node.js + Express  
- system integration layer  
- communication between modules  

---

# 📌 Conclusion

ElderEase provides a **scalable modular architecture for intelligent elderly health monitoring systems**.

The current prototype demonstrates **real-time health monitoring through simulated sensor data and rule-based analysis**, while the system architecture supports progressive expansion with:

- backend infrastructure  
- database integration  
- AI-based health analytics  
- IoT-based sensor monitoring  

The platform is designed to evolve into a **complete intelligent healthcare monitoring ecosystem for elderly care**.

---

# 📜 License

This project is licensed under the **MIT License**.

---

# 💬 Final Note

“Because every heartbeat deserves timely care.” ❤️
