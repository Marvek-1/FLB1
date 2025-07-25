#!/usr/bin/env python3
"""
FlameBorn Testnet API Test Suite
Ubuntu Philosophy: I am because we are
"""

import requests
import json
import time
from datetime import datetime

# Configuration
BASE_URL = "http://localhost:8000"
TEST_WALLET = "0xtest1234567890abcdef1234567890abcdef123456"

def test_endpoint(endpoint, method="GET", data=None, expected_status=200):
    """Test an API endpoint"""
    url = f"{BASE_URL}{endpoint}"
    
    try:
        if method == "GET":
            response = requests.get(url)
        elif method == "POST":
            response = requests.post(url, json=data)
        elif method == "PUT":
            response = requests.put(url, json=data)
        
        print(f"🧪 Testing {method} {endpoint}")
        print(f"   Status: {response.status_code}")
        
        if response.status_code == expected_status:
            print(f"   ✅ Success")
            if response.headers.get('content-type', '').startswith('application/json'):
                result = response.json()
                print(f"   📄 Response: {json.dumps(result, indent=2)[:200]}...")
            return True
        else:
            print(f"   ❌ Failed - Expected {expected_status}, got {response.status_code}")
            return False
            
    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        return False

def main():
    print("🔥🔥🔥 FLAMEBORN TESTNET API TESTING 🔥🔥🔥")
    print("Ubuntu Philosophy: I am because we are")
    print("=" * 50)
    
    # Wait for server to be ready
    print("⏳ Waiting for server to be ready...")
    time.sleep(2)
    
    tests_passed = 0
    total_tests = 0
    
    # Test basic endpoints
    endpoints_to_test = [
        ("/", "GET"),
        ("/ping", "GET"),
        ("/health", "GET"),
        ("/.well-known/manifest.json", "GET"),
        ("/stats", "GET"),
        ("/users", "GET"),
        ("/validators", "GET"),
        ("/transactions", "GET"),
        ("/healthcare-actions", "GET"),
        ("/oracle/price", "GET"),
        ("/oracle/network", "GET"),
        ("/oracle/ubuntu-metrics", "GET"),
    ]
    
    for endpoint, method in endpoints_to_test:
        total_tests += 1
        if test_endpoint(endpoint, method):
            tests_passed += 1
        print()
    
    # Test user creation
    print("👤 Testing user creation...")
    total_tests += 1
    user_data = {
        "wallet_address": TEST_WALLET,
        "role": "healer",
        "name": "Dr. Ubuntu Test",
        "location": "Test City, Africa"
    }
    
    if test_endpoint("/users", "POST", user_data, 200):
        tests_passed += 1
        print("   ✅ User created successfully")
    print()
    
    # Test user verification
    print("✅ Testing user verification...")
    total_tests += 1
    if test_endpoint(f"/users/{TEST_WALLET}/verify", "PUT", expected_status=200):
        tests_passed += 1
        print("   ✅ User verified successfully")
    print()
    
    # Test healthcare action creation
    print("🏥 Testing healthcare action creation...")
    total_tests += 1
    action_data = {
        "user_address": TEST_WALLET,
        "action_type": "birth_verification",
        "description": "Test birth verification for Ubuntu community",
        "impact_score": 9.5
    }
    
    if test_endpoint("/healthcare-actions", "POST", action_data, 200):
        tests_passed += 1
        print("   ✅ Healthcare action created successfully")
    print()
    
    # Test validator creation
    print("⚡ Testing validator creation...")
    total_tests += 1
    validator_data = {
        "wallet_address": TEST_WALLET,
        "stake_amount": 10000.0,
        "validator_key": "test_ubuntu_validator_key"
    }
    
    if test_endpoint("/validators", "POST", validator_data, 200):
        tests_passed += 1
        print("   ✅ Validator created successfully")
    print()
    
    # Test validator heartbeat
    print("💓 Testing validator heartbeat...")
    total_tests += 1
    if test_endpoint(f"/validators/{TEST_WALLET}/heartbeat", "POST", expected_status=200):
        tests_passed += 1
        print("   ✅ Validator heartbeat successful")
    print()
    
    # Test development endpoints
    print("🛠️ Testing development endpoints...")
    total_tests += 1
    if test_endpoint("/dev/seed-data", "POST", expected_status=200):
        tests_passed += 1
        print("   ✅ Test data seeded successfully")
    print()
    
    # Final results
    print("=" * 50)
    print(f"🧪 TEST RESULTS")
    print(f"   Tests Passed: {tests_passed}/{total_tests}")
    print(f"   Success Rate: {(tests_passed/total_tests)*100:.1f}%")
    
    if tests_passed == total_tests:
        print("🎉 ALL TESTS PASSED! FlameBorn Testnet is ready!")
        print("🔥 The flame roars with Ubuntu spirit!")
    else:
        print("⚠️  Some tests failed. Check the logs above.")
    
    print("🌍 Ubuntu: I am because we are")

if __name__ == "__main__":
    main()
