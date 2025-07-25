import type { HealthcareWorker } from "./types/healthcare-worker"

export function getHealthcareWorkersWithDistribution(): HealthcareWorker[] {
  return [
    {
      id: "1",
      address: "0xf39Fd6e51aad88F6F4ce6aB8829539c652746fF0",
      name: "Dr. Amara Okafor",
      credentials: "MD, Community Health Specialist",
      isVerified: true,
      location: { name: "Lagos General Hospital", countryCode: "NG" },
      profileImage: "/confident-african-doctor.png",
      impactScore: 95,
      distributionPercentage: 35,
    },
    {
      id: "2",
      address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      name: "Nurse Fatima Diallo",
      credentials: "RN, Maternal Health Specialist",
      isVerified: true,
      location: { name: "Dakar Community Clinic", countryCode: "SN" },
      profileImage: "/confident-caregiver.png",
      impactScore: 88,
      distributionPercentage: 30,
    },
    {
      id: "3",
      address: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
      name: "Dr. Kwame Asante",
      credentials: "Traditional Healer, Herbalist",
      isVerified: true,
      location: { name: "Kumasi Traditional Medicine Center", countryCode: "GH" },
      profileImage: "/focused-african-journalist.png",
      impactScore: 82,
      distributionPercentage: 25,
    },
    {
      id: "4",
      address: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
      name: "Sister Mary Wanjiku",
      credentials: "Community Health Worker",
      isVerified: true,
      location: { name: "Nairobi Slum Outreach", countryCode: "KE" },
      profileImage: "/anonymous-profile.png",
      impactScore: 76,
      distributionPercentage: 10,
    },
  ]
}
