# Flameborn Frontend Logic

## Youth + Healer Token Flow

### Health Actor Registration
1. Health workers register through the platform
2. Required information:
   - Name
   - Location
   - Medical credentials
   - Wallet address
3. Submit to `HealthActorsRegistry.registerHealthActor()`

### Verification Process
1. Flameborn DAO members review registration
2. Upon approval, call `HealthActorsRegistry.verifyHealthActor()`
3. Verified status is stored on-chain

### Token Minting
1. Users can mint FLB tokens by:
   - Direct purchase through `DonationRouter.mintFLBToken()`
   - Contribution to verified health actors

### Donation Flow
1. User selects a verified health actor
2. User specifies donation amount
3. Call `DonationRouter.donate()` with health actor's address
4. Smart contract:
   - Verifies recipient is registered
   - Transfers funds
   - Mints proportional FLB tokens to donor

### Dashboard Views
1. **For Health Actors:**
   - Registration status
   - Received donations
   - Impact metrics

2. **For Donors:**
   - FLB token balance
   - Donation history
   - Impact tracking

### Impact Tracking
1. Health actors report outcomes
2. Data is stored and linked to donor contributions
3. Donors can view direct impact of their donations
\`\`\`

Let's create a contracts deployment notes file:
