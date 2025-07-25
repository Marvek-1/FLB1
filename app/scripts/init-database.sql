-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_sync_type ON neon_auth.users_sync USING gin ((raw_json->>'type'));
CREATE INDEX IF NOT EXISTS idx_users_sync_verification ON neon_auth.users_sync USING gin ((raw_json->>'verificationStatus'));
CREATE INDEX IF NOT EXISTS idx_users_sync_country ON neon_auth.users_sync USING gin ((raw_json->>'country'));
CREATE INDEX IF NOT EXISTS idx_users_sync_specialization ON neon_auth.users_sync USING gin ((raw_json->>'specialization'));
CREATE INDEX IF NOT EXISTS idx_users_sync_created_at ON neon_auth.users_sync (created_at);
CREATE INDEX IF NOT EXISTS idx_users_sync_deleted_at ON neon_auth.users_sync (deleted_at);
CREATE INDEX IF NOT EXISTS idx_users_sync_soulprint ON neon_auth.users_sync USING gin ((raw_json->>'soulprintVerified'));

-- Insert sample Guardian users
INSERT INTO neon_auth.users_sync (id, name, email, created_at, updated_at, raw_json) VALUES
(
  'guardian-001',
  'Amara Okafor',
  'amara.okafor@example.com',
  NOW() - INTERVAL '15 days',
  NOW() - INTERVAL '15 days',
  '{
    "type": "guardian",
    "country": "Nigeria",
    "contributionAmount": "250.00",
    "currency": "USD",
    "paymentMethod": "crypto",
    "motivation": "Supporting healthcare workers in my community",
    "profileImage": "/anonymous-profile.png",
    "walletAddress": "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    "registeredAt": "2024-01-15T10:30:00Z",
    "impact": {
      "donationsCount": 12,
      "totalDonated": 250.00,
      "healthWorkersSupported": 3
    },
    "achievements": [
      {
        "id": "first-donation",
        "title": "First Flame",
        "description": "Made your first donation to support African healthcare",
        "icon": "flame",
        "awardedAt": "2024-01-15T10:30:00Z"
      }
    ]
  }'
),
(
  'guardian-002',
  'Kwame Asante',
  'kwame.asante@example.com',
  NOW() - INTERVAL '8 days',
  NOW() - INTERVAL '8 days',
  '{
    "type": "guardian",
    "country": "Ghana",
    "contributionAmount": "500.00",
    "currency": "USD",
    "paymentMethod": "bank_transfer",
    "motivation": "Investing in the future of African healthcare",
    "profileImage": "/anonymous-profile.png",
    "walletAddress": "0x8b4513Cc6634C0532925a3b8D4C0532925a3b8D4",
    "registeredAt": "2024-01-22T14:15:00Z",
    "impact": {
      "donationsCount": 25,
      "totalDonated": 500.00,
      "healthWorkersSupported": 8
    },
    "achievements": [
      {
        "id": "generous-guardian",
        "title": "Generous Guardian",
        "description": "Donated over $500 to support healthcare workers",
        "icon": "heart",
        "awardedAt": "2024-01-25T16:20:00Z"
      }
    ]
  }'
),
(
  'guardian-003',
  'Fatima Al-Rashid',
  'fatima.alrashid@example.com',
  NOW() - INTERVAL '3 days',
  NOW() - INTERVAL '3 days',
  '{
    "type": "guardian",
    "country": "Morocco",
    "contributionAmount": "150.00",
    "currency": "USD",
    "paymentMethod": "crypto",
    "motivation": "Empowering women in healthcare across Africa",
    "profileImage": "/anonymous-profile.png",
    "walletAddress": "0x2a2a2aCC6634C0532925a3b8D4C0532925a3b8D4",
    "registeredAt": "2024-01-27T09:45:00Z",
    "impact": {
      "donationsCount": 6,
      "totalDonated": 150.00,
      "healthWorkersSupported": 2
    },
    "achievements": [
      {
        "id": "community-supporter",
        "title": "Community Supporter",
        "description": "Actively supporting healthcare in your region",
        "icon": "users",
        "awardedAt": "2024-01-27T09:45:00Z"
      }
    ]
  }'
),
(
  'guardian-004',
  'Thabo Mthembu',
  'thabo.mthembu@example.com',
  NOW() - INTERVAL '2 days',
  NOW() - INTERVAL '2 days',
  '{
    "type": "guardian",
    "country": "South Africa",
    "contributionAmount": "75.00",
    "currency": "USD",
    "paymentMethod": "mobile_money",
    "motivation": "Supporting healthcare transformation in Southern Africa",
    "profileImage": "/anonymous-profile.png",
    "registeredAt": "2024-01-28T13:10:00Z",
    "impact": {
      "donationsCount": 3,
      "totalDonated": 75.00,
      "healthWorkersSupported": 1
    }
  }'
);

-- Insert sample Healer users
INSERT INTO neon_auth.users_sync (id, name, email, created_at, updated_at, raw_json) VALUES
(
  'healer-001',
  'Dr. Aisha Mwangi',
  'aisha.mwangi@example.com',
  NOW() - INTERVAL '20 days',
  NOW() - INTERVAL '20 days',
  '{
    "type": "healer",
    "role": "Community Health Worker",
    "specialization": "General Practice Doctor",
    "region": "East Africa",
    "country": "Kenya",
    "city": "Nairobi",
    "facilityName": "Kibera Community Health Center",
    "experience": "8 years",
    "credentials": "MD, MPH",
    "bio": "Dedicated to improving healthcare access in underserved communities",
    "profileImage": "/confident-african-doctor.png",
    "walletAddress": "0x1234567890abcdef1234567890abcdef12345678",
    "faceVerified": true,
    "licenseVerified": true,
    "verificationStatus": "verified",
    "registeredAt": "2024-01-10T08:00:00Z",
    "impact": {
      "patientsServed": 1250,
      "communitiesReached": 5,
      "donationsReceived": 8
    },
    "achievements": [
      {
        "id": "verified-healer",
        "title": "Verified Healer",
        "description": "Successfully completed verification process",
        "icon": "shield-check",
        "awardedAt": "2024-01-12T10:00:00Z"
      }
    ]
  }'
),
(
  'healer-002',
  'Nurse Grace Banda',
  'grace.banda@example.com',
  NOW() - INTERVAL '12 days',
  NOW() - INTERVAL '12 days',
  '{
    "type": "healer",
    "role": "Community Health Worker",
    "specialization": "Registered Nurse - Maternal Health",
    "region": "Southern Africa",
    "country": "Zambia",
    "city": "Lusaka",
    "facilityName": "Matero Clinic",
    "experience": "5 years",
    "credentials": "RN, Midwifery Certificate",
    "bio": "Passionate about maternal and child health in rural communities",
    "profileImage": "/confident-caregiver.png",
    "walletAddress": "0xabcdef1234567890abcdef1234567890abcdef12",
    "faceVerified": true,
    "licenseVerified": true,
    "verificationStatus": "verified",
    "registeredAt": "2024-01-18T12:30:00Z",
    "impact": {
      "patientsServed": 890,
      "communitiesReached": 3,
      "donationsReceived": 5
    },
    "achievements": [
      {
        "id": "maternal-champion",
        "title": "Maternal Health Champion",
        "description": "Specialized in supporting mothers and children",
        "icon": "baby",
        "awardedAt": "2024-01-20T14:15:00Z"
      }
    ]
  }'
),
(
  'healer-003',
  'Pharmacist Omar Hassan',
  'omar.hassan@example.com',
  NOW() - INTERVAL '6 days',
  NOW() - INTERVAL '6 days',
  '{
    "type": "healer",
    "role": "Community Health Worker",
    "specialization": "Clinical Pharmacist",
    "region": "East Africa",
    "country": "Uganda",
    "city": "Kampala",
    "facilityName": "Mulago Hospital Pharmacy",
    "experience": "6 years",
    "credentials": "PharmD, Clinical Pharmacy Certification",
    "bio": "Ensuring safe and effective medication access for all",
    "profileImage": "/focused-african-journalist.png",
    "walletAddress": "0x9876543210fedcba9876543210fedcba98765432",
    "faceVerified": false,
    "licenseVerified": true,
    "verificationStatus": "pending",
    "registeredAt": "2024-01-24T16:45:00Z",
    "impact": {
      "patientsServed": 450,
      "communitiesReached": 2,
      "donationsReceived": 2
    },
    "achievements": []
  }'
),
(
  'healer-004',
  'Midwife Zara Osei',
  'zara.osei@example.com',
  NOW() - INTERVAL '1 day',
  NOW() - INTERVAL '1 day',
  '{
    "type": "healer",
    "role": "Community Health Worker",
    "specialization": "Certified Midwife",
    "region": "North Africa",
    "country": "Egypt",
    "city": "Cairo",
    "facilityName": "Al-Azhar Maternity Ward",
    "experience": "10 years",
    "credentials": "Certified Midwife, BSN",
    "bio": "Bringing life safely into the world, one birth at a time",
    "profileImage": "/BridgingWorldsOfHealing.png",
    "walletAddress": "0xfedcba9876543210fedcba9876543210fedcba98",
    "faceVerified": true,
    "licenseVerified": false,
    "verificationStatus": "pending",
    "registeredAt": "2024-01-29T11:20:00Z",
    "impact": {
      "patientsServed": 320,
      "communitiesReached": 1,
      "donationsReceived": 1
    },
    "achievements": []
  }'
);

-- Insert sample data representing diverse African healthcare workers and guardians
-- This data includes Soulbound and Codex categories for the Kairo Covenant system

-- Healers (Healthcare Workers)
INSERT INTO neon_auth.users_sync (id, name, email, raw_json, created_at, updated_at) VALUES
('healer_001', 'Dr. Amara Okafor', 'amara.okafor@flameborn.africa', '{
  "type": "healer",
  "specialization": "General Practitioner",
  "country": "Nigeria",
  "region": "West Africa",
  "verificationStatus": "verified",
  "soulprintVerified": true,
  "resonanceScore": 0.98,
  "ancestralVerification": true,
  "impact": {
    "patientsServed": 1250,
    "communitiesReached": 8,
    "donationsReceived": 2400
  },
  "flbBalance": 150,
  "achievements": ["Community Hero", "Verified Healer", "Soulbound Verified"]
}', NOW() - INTERVAL '45 days', NOW()),

('healer_002', 'Nurse Fatima Al-Rashid', 'fatima.rashid@flameborn.africa', '{
  "type": "healer",
  "specialization": "Pediatric Nurse",
  "country": "Morocco",
  "region": "North Africa",
  "verificationStatus": "verified",
  "soulprintVerified": true,
  "resonanceScore": 0.97,
  "ancestralVerification": true,
  "impact": {
    "patientsServed": 890,
    "communitiesReached": 5,
    "donationsReceived": 1800
  },
  "flbBalance": 120,
  "achievements": ["Pediatric Specialist", "Verified Healer"]
}', NOW() - INTERVAL '38 days', NOW()),

('healer_003', 'Dr. Kwame Asante', 'kwame.asante@flameborn.africa', '{
  "type": "healer",
  "specialization": "Surgeon",
  "country": "Ghana",
  "region": "West Africa",
  "verificationStatus": "verified",
  "soulprintVerified": true,
  "resonanceScore": 0.99,
  "ancestralVerification": true,
  "role": "scroll_keeper",
  "scrollsCreated": 3,
  "proverbContributions": 12,
  "impact": {
    "patientsServed": 2100,
    "communitiesReached": 12,
    "donationsReceived": 4200
  },
  "flbBalance": 280,
  "achievements": ["Master Surgeon", "Scroll Keeper", "Proverb Contributor"]
}', NOW() - INTERVAL '52 days', NOW()),

('healer_004', 'Midwife Grace Mwangi', 'grace.mwangi@flameborn.africa', '{
  "type": "healer",
  "specialization": "Midwife",
  "country": "Kenya",
  "region": "East Africa",
  "verificationStatus": "verified",
  "soulprintVerified": true,
  "resonanceScore": 0.98,
  "ancestralVerification": true,
  "impact": {
    "patientsServed": 650,
    "communitiesReached": 6,
    "donationsReceived": 1500
  },
  "flbBalance": 95,
  "achievements": ["Birth Guardian", "Community Midwife"]
}', NOW() - INTERVAL '29 days', NOW()),

('healer_005', 'Pharmacist Tendai Mukamuri', 'tendai.mukamuri@flameborn.africa', '{
  "type": "healer",
  "specialization": "Pharmacist",
  "country": "Zimbabwe",
  "region": "Southern Africa",
  "verificationStatus": "pending",
  "soulprintVerified": false,
  "resonanceScore": 0.85,
  "impact": {
    "patientsServed": 420,
    "communitiesReached": 3,
    "donationsReceived": 800
  },
  "flbBalance": 45,
  "achievements": ["Medicine Guardian"]
}', NOW() - INTERVAL '15 days', NOW()),

('healer_006', 'Dr. Aisha Kone', 'aisha.kone@flameborn.africa', '{
  "type": "healer",
  "specialization": "Pediatrician",
  "country": "Mali",
  "region": "West Africa",
  "verificationStatus": "verified",
  "soulprintVerified": true,
  "resonanceScore": 0.97,
  "ancestralVerification": true,
  "codeContributions": 5,
  "impact": {
    "patientsServed": 980,
    "communitiesReached": 7,
    "donationsReceived": 2100
  },
  "flbBalance": 165,
  "achievements": ["Child Protector", "Code Contributor"]
}', NOW() - INTERVAL '33 days', NOW()),

('healer_007', 'Nurse Zara Osman', 'zara.osman@flameborn.africa', '{
  "type": "healer",
  "specialization": "Emergency Nurse",
  "country": "Sudan",
  "region": "North Africa",
  "verificationStatus": "verified",
  "soulprintVerified": true,
  "resonanceScore": 0.96,
  "ancestralVerification": true,
  "impact": {
    "patientsServed": 1100,
    "communitiesReached": 9,
    "donationsReceived": 2200
  },
  "flbBalance": 140,
  "achievements": ["Emergency Hero", "Crisis Responder"]
}', NOW() - INTERVAL '41 days', NOW()),

('healer_008', 'Dr. Naledi Motsepe', 'naledi.motsepe@flameborn.africa', '{
  "type": "healer",
  "specialization": "Family Doctor",
  "country": "Botswana",
  "region": "Southern Africa",
  "verificationStatus": "pending",
  "soulprintVerified": false,
  "resonanceScore": 0.92,
  "impact": {
    "patientsServed": 150,
    "communitiesReached": 2,
    "donationsReceived": 200
  },
  "flbBalance": 15,
  "achievements": ["New Healer"]
}', NOW() - INTERVAL '3 days', NOW()),

('healer_009', 'Nurse Asha Wanjiku', 'asha.wanjiku@flameborn.africa', '{
  "type": "healer",
  "specialization": "Community Nurse",
  "country": "Kenya",
  "region": "East Africa",
  "verificationStatus": "pending",
  "soulprintVerified": true,
  "resonanceScore": 0.95,
  "ancestralVerification": true,
  "impact": {
    "patientsServed": 80,
    "communitiesReached": 1,
    "donationsReceived": 100
  },
  "flbBalance": 10,
  "achievements": ["New Healer", "Soulbound Verified"]
}', NOW() - INTERVAL '1 day', NOW());

-- Guardians (Community Supporters)
INSERT INTO neon_auth.users_sync (id, name, email, raw_json, created_at, updated_at) VALUES
('guardian_001', 'Kofi Mensah', 'kofi.mensah@flameborn.africa', '{
  "type": "guardian",
  "country": "Ghana",
  "region": "West Africa",
  "contributionAmount": 500,
  "soulprintVerified": true,
  "resonanceScore": 0.98,
  "ancestralVerification": true,
  "proverbContributions": 8,
  "supportedWorkers": ["healer_001", "healer_003"],
  "flbBalance": 75,
  "achievements": ["Guardian of Health", "Proverb Keeper", "Soulbound Verified"]
}', NOW() - INTERVAL '60 days', NOW()),

('guardian_002', 'Amina Hassan', 'amina.hassan@flameborn.africa', '{
  "type": "guardian",
  "country": "Egypt",
  "region": "North Africa",
  "contributionAmount": 750,
  "soulprintVerified": true,
  "resonanceScore": 0.97,
  "ancestralVerification": true,
  "role": "scroll_keeper",
  "scrollsCreated": 2,
  "proverbContributions": 15,
  "supportedWorkers": ["healer_002", "healer_007"],
  "flbBalance": 120,
  "achievements": ["Master Guardian", "Scroll Keeper", "Wisdom Keeper"]
}', NOW() - INTERVAL '55 days', NOW()),

('guardian_003', 'Thabo Mthembu', 'thabo.mthembu@flameborn.africa', '{
  "type": "guardian",
  "country": "South Africa",
  "region": "Southern Africa",
  "contributionAmount": 300,
  "soulprintVerified": true,
  "resonanceScore": 0.99,
  "ancestralVerification": true,
  "codeContributions": 12,
  "supportedWorkers": ["healer_005"],
  "flbBalance": 90,
  "achievements": ["Code Guardian", "Tech Contributor", "Ubuntu Spirit"]
}', NOW() - INTERVAL '48 days', NOW()),

('guardian_004', 'Mariam Traore', 'mariam.traore@flameborn.africa', '{
  "type": "guardian",
  "country": "Burkina Faso",
  "region": "West Africa",
  "contributionAmount": 200,
  "soulprintVerified": false,
  "resonanceScore": 0.89,
  "supportedWorkers": ["healer_006"],
  "flbBalance": 35,
  "achievements": ["Community Supporter"]
}', NOW() - INTERVAL '25 days', NOW()),

('guardian_005', 'Joseph Mukasa', 'joseph.mukasa@flameborn.africa', '{
  "type": "guardian",
  "country": "Uganda",
  "region": "East Africa",
  "contributionAmount": 450,
  "soulprintVerified": true,
  "resonanceScore": 0.96,
  "ancestralVerification": true,
  "proverbContributions": 6,
  "supportedWorkers": ["healer_004"],
  "flbBalance": 65,
  "achievements": ["East African Guardian", "Wisdom Contributor"]
}', NOW() - INTERVAL '37 days', NOW()),

('guardian_006', 'Fatou Diallo', 'fatou.diallo@flameborn.africa', '{
  "type": "guardian",
  "country": "Senegal",
  "region": "West Africa",
  "contributionAmount": 600,
  "soulprintVerified": true,
  "resonanceScore": 0.98,
  "ancestralVerification": true,
  "role": "scroll_keeper",
  "scrollsCreated": 1,
  "proverbContributions": 10,
  "codeContributions": 3,
  "supportedWorkers": ["healer_001", "healer_006"],
  "flbBalance": 110,
  "achievements": ["Multi-Contributor", "Scroll Keeper", "Teranga Spirit"]
}', NOW() - INTERVAL '42 days', NOW()),

('guardian_007', 'Omar Benali', 'omar.benali@flameborn.africa', '{
  "type": "guardian",
  "country": "Tunisia",
  "region": "North Africa",
  "contributionAmount": 150,
  "soulprintVerified": false,
  "resonanceScore": 0.88,
  "supportedWorkers": [],
  "flbBalance": 20,
  "achievements": ["New Guardian"]
}', NOW() - INTERVAL '2 days', NOW());

-- Create a view for easy statistics querying
CREATE OR REPLACE VIEW community_stats AS
SELECT 
  COUNT(*) FILTER (WHERE raw_json->>'type' = 'healer') as total_healers,
  COUNT(*) FILTER (WHERE raw_json->>'type' = 'healer' AND raw_json->>'verificationStatus' = 'verified') as verified_healers,
  COUNT(*) FILTER (WHERE raw_json->>'type' = 'guardian') as total_guardians,
  COUNT(*) FILTER (WHERE raw_json->>'type' = 'guardian' AND (raw_json->>'contributionAmount')::numeric > 0) as active_guardians,
  COUNT(*) FILTER (WHERE raw_json->>'soulprintVerified' = 'true') as soulbound_total,
  COUNT(*) FILTER (WHERE raw_json->>'role' = 'scroll_keeper') as scroll_keepers,
  COUNT(*) FILTER (WHERE (raw_json->>'proverbContributions')::numeric > 0) as proverb_contributors,
  COUNT(*) FILTER (WHERE (raw_json->>'codeContributions')::numeric > 0) as code_contributors,
  SUM((raw_json->>'contributionAmount')::numeric) FILTER (WHERE raw_json->>'type' = 'guardian') as total_contributions,
  SUM((raw_json->'impact'->>'patientsServed')::numeric) FILTER (WHERE raw_json->>'type' = 'healer') as total_patients_served,
  COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as new_this_week,
  COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as new_this_month
FROM neon_auth.users_sync;

-- Grant permissions (adjust as needed for your setup)
-- GRANT SELECT ON community_stats TO your_app_user;

COMMIT;
