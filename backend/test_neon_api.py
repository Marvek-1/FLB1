"""
FlameBorn Ubuntu Testnet API Tests
Ubuntu Philosophy: "I am because we are"
"""

import requests
import json
import time
from datetime import datetime

# Test configuration
BASE_URL = "http://localhost:8000"
TEST_WALLET = "0x1111111111111111111111111111111111111111"

def test_endpoint(method, endpoint, data=None, expected_status=200):
    """Test API endpoint"""
    url = f"{BASE_URL}{endpoint}"
    
    try:
        if method == "GET":
            response = requests.get(url)
        elif method == "POST":
            response = requests.post(url, json=data)
        elif method == "PUT":
            response = requests.put(url, json=data)
        
        print(f"🔥 {method} {endpoint}")
        print(f"   Status: {response.status_code}")
        
        if response.status_code == expected_status:
            print("   ✅ SUCCESS")
            if response.headers.get('content-type', '').startswith('application/json'):
                result = response.json()
                if isinstance(result, dict) and 'ubuntu' in str(result).lower():
                    print("   🌍 Ubuntu philosophy detected!")
                return result
        else:
            print(f"   ❌ FAILED - Expected {expected_status}, got {response.status_code}")
            print(f"   Response: {response.text}")
        
        print()
        return None
        
    except Exception as e:
        print(f"   ❌ ERROR: {e}")
        print()
        return None

def run_ubuntu_tests():
    """Run comprehensive Ubuntu testnet tests"""
    
    print("🔥 FlameBorn Ubuntu Testnet API Tests")
    print("Ubuntu Philosophy: I am because we are")
    print("=" * 50)
    print()
    
    # Test 1: Basic connectivity
    print("1. Testing Basic Connectivity")
    test_endpoint("GET", "/ping")
    test_endpoint("GET", "/health")
    test_endpoint("GET", "/")
    
    # Test 2: Ubuntu manifest
    print("2. Testing Ubuntu Protocol Manifest")
    manifest = test_endpoint("GET", "/.well-known/manifest.json")
    if manifest and "ubuntu_philosophy" in manifest:
        print("   🌍 Ubuntu philosophy confirmed in manifest!")
    
    # Test 3: Ubuntu statistics
    print("3. Testing Ubuntu Network Statistics")
    stats = test_endpoint("GET", "/ubuntu/stats")
    if stats and "ubuntu_metrics" in stats:
        print("   📊 Ubuntu metrics active!")
    
    # Test 4: Create Ubuntu user
    print("4. Testing Ubuntu User Creation")
    user_data = {
        "wallet_address": TEST_WALLET,
        "role": "healer",
        "name": "Dr. Ubuntu Test",
        "location": "Test City",
        "country": "Test Country"
    }
    user = test_endpoint("POST", "/ubuntu/users", user_data, 200)
    if user and "ubuntu_score" in user:
        print("   👤 Ubuntu user created successfully!")
    
    # Test 5: Get Ubuntu users
    print("5. Testing Ubuntu Community Listing")
    users = test_endpoint("GET", "/ubuntu/users")
    if users and isinstance(users, list):
        print(f"   👥 Found {len(users)} Ubuntu community members!")
    
    # Test 6: Verify Ubuntu user
    print("6. Testing Ubuntu User Verification")
    verify_result = test_endpoint("PUT", f"/ubuntu/users/{TEST_WALLET}/verify")
    if verify_result and "ubuntu_blessing" in verify_result:
        print("   ✅ Ubuntu verification blessing received!")
    
    # Test 7: Create healthcare action
    print("7. Testing Ubuntu Healthcare Action")
    action_data = {
        "action_type": "birth_verification",
        "title": "Ubuntu Test Birth Registration",
        "description": "Testing Ubuntu birth verification system with community validation",
        "location": "Test Ubuntu Community",
        "impact_score": 8.5
    }
    action = test_endpoint("POST", f"/ubuntu/healthcare-actions?wallet_address={TEST_WALLET}", action_data)
    if action and "ubuntu_blessing" in action:
        print("   🏥 Ubuntu healthcare action recorded with blessing!")
    
    # Test 8: Get healthcare actions
    print("8. Testing Ubuntu Healthcare Actions Listing")
    actions = test_endpoint("GET", "/ubuntu/healthcare-actions")
    if actions and isinstance(actions, list):
        print(f"   🏥 Found {len(actions)} Ubuntu healthcare actions!")
    
    # Test 9: Create Ubuntu validator
    print("9. Testing Ubuntu Validator Registration")
    validator_data = {
        "wallet_address": TEST_WALLET,
        "stake_amount": 5000.0,
        "validator_key": "ubuntu_test_validator_key"
    }
    validator = test_endpoint("POST", "/ubuntu/validators", validator_data)
    if validator and "ubuntu_consensus_score" in validator:
        print("   🛡️ Ubuntu validator registered with consensus score!")
    
    # Test 10: Validator heartbeat
    print("10. Testing Ubuntu Validator Heartbeat")
    heartbeat = test_endpoint("POST", f"/ubuntu/validators/{TEST_WALLET}/heartbeat")
    if heartbeat and "ubuntu_pulse" in heartbeat:
        print("   💓 Ubuntu validator heartbeat received!")
    
    # Test 11: Ubuntu wisdom oracle
    print("11. Testing Ubuntu Wisdom Oracle")
    wisdom = test_endpoint("GET", "/oracle/ubuntu-wisdom")
    if wisdom and "proverb" in wisdom:
        print("   🧠 Ubuntu wisdom retrieved!")
        print(f"   Proverb: {wisdom.get('proverb', 'N/A')}")
    
    # Test 12: Ubuntu price oracle
    print("12. Testing Ubuntu FLAME Price Oracle")
    price = test_endpoint("GET", "/oracle/ubuntu-price")
    if price and "ubuntu_blessing" in price:
        print("   💰 Ubuntu FLAME price oracle active!")
    
    # Test 13: Seed additional data
    print("13. Testing Ubuntu Data Seeding")
    seed_result = test_endpoint("POST", "/dev/seed-ubuntu-data")
    if seed_result and "ubuntu_blessing" in seed_result:
        print("   🌱 Ubuntu community data seeded successfully!")
    
    # Final statistics
    print("14. Final Ubuntu Network Statistics")
    final_stats = test_endpoint("GET", "/ubuntu/stats")
    if final_stats:
        community = final_stats.get("community", {})
        ubuntu_metrics = final_stats.get("ubuntu_metrics", {})
        
        print(f"   👥 Total Ubuntu Members: {community.get('total_users', 0)}")
        print(f"   🏥 Healers: {community.get('healers', 0)}")
        print(f"   🛡️ Guardians: {community.get('guardians', 0)}")
        print(f"   🌍 Community Members: {community.get('community_members', 0)}")
        print(f"   📊 Ubuntu Network Score: {ubuntu_metrics.get('network_ubuntu_score', 0)}")
        print(f"   🔥 Network Health: {final_stats.get('network_health', 'unknown')}")
    
    print()
    print("🔥 Ubuntu Testnet API Tests Complete!")
    print("Ubuntu Philosophy: I am because we are")
    print("The flame burns bright in our Ubuntu community! 🔥")

if __name__ == "__main__":
    # Wait for server to start
    print("⏳ Waiting for Ubuntu testnet to start...")
    time.sleep(3)
    
    # Run tests
    run_ubuntu_tests()
