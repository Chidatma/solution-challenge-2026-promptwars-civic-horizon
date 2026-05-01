# Security Specification - Civic Horizon

## 1. Data Invariants
- A user's XP and progress can only be modified by the authenticated user themselves.
- XP must be an integer.
- Progress values must be between 0 and 100.
- Timestamps must correspond to the server time of the request.
- Metadata fields like `uid` and `email` are immutable once set or must match the auth token.

## 2. The "Dirty Dozen" Payloads
These payloads attempt to exploit common vulnerabilities and should be denied.

1. **Identity Spoofing**: Attempt to update another user's XP.
   - `PUT /users/victim_uid { xp: 999999 }` (Auth: attacker_uid)
2. **Shadow Field Injection**: Attempt to add an unvalidated administrative field.
   - `PATCH /users/my_uid { xp: 100, isAdmin: true }`
3. **Resource Poisoning**: Use a massive string as a topic ID.
   - `SET /users/my_uid/progress/VERY_LONG_STRING_OVER_128_CHARS { value: 100 }`
4. **Invalid Type Injection**: Pass a string to an integer XP field.
   - `PATCH /users/my_uid { xp: "LOTS" }`
5. **State Skipping**: Manually setting a badge without completion.
   - `SET /users/my_uid/badges/QuizMaster { earnedAt: request.time }` (External to the app's logic flow)
6. **Timestamp Spoofing**: Sending an old timestamp to `updatedAt`.
   - `PATCH /users/my_uid { updatedAt: "2020-01-01T00:00:00Z" }`
7. **Negative XP**: Attempting to set XP to a negative value.
   - `PATCH /users/my_uid { xp: -100 }`
8. **Malicious ID Characters**: Using script tags in IDs.
   - `SET /users/my_uid/progress/<script> { ... }`
9. **Email Spoofing (Unverified)**: Setting a verified email flag to true without actual verification.
   - `PATCH /users/my_uid { emailVerified: true }` (Check against `request.auth.token.email_verified`)
10. **Orphaned Write**: Setting progress for a topic without a user profile existing.
    - `SET /users/my_uid/progress/timeline { ... }` (Should check parent exists)
11. **Denial of Wallet**: Massive array in a user document.
    - `PATCH /users/my_uid { tags: ["a","b",...x1000] }`
12. **Blanket Read Attempt**: Trying to list all user emails.
    - `GET /users` (Should only allow reading own profile or specific public fields if any)

## 3. Test Runner Configuration
Tests will verify that these payloads return `PERMISSION_DENIED`.
