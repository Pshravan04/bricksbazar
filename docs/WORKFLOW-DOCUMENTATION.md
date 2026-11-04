# BRICKSBAZAR — Core Platform Workflows

## 1. Property Submission & Moderation Lifecycle

```
[ Owner / Agent ] ──> Step 1 to Step 14 Wizard
                            │
                            ▼
                     [ Status: DRAFT ] (Persisted / Resumable)
                            │
                            ▼ Submit for Review
                 [ Status: PENDING_REVIEW ]
                            │
             ┌──────────────┴──────────────┐
             ▼                             ▼
       [ Admin Rejection ]          [ Admin Approval ]
             │                             │
             ▼                             ▼
   [ CHANGES_REQUESTED ]           [ Status: APPROVED ]
             │                             │
             ▼                             ▼
    (Resubmit by Owner)            [ Status: PUBLISHED ]
                                           │
                                  ┌────────┴────────┐
                                  ▼                 ▼
                          [ UNDER_OFFER ]    [ SOLD / RENTED ]
```

### Lifecycle Rules:
1. **DRAFT**: Created by owner or agent; visible only to the creator. Can be edited, images reordered, and resumed.
2. **PENDING_REVIEW**: Submitted to administrative moderation queue. Creator can view read-only; admin evaluates RERA validity, image quality, and title accuracy.
3. **CHANGES_REQUESTED**: Admin flags required modifications with clear rationale; listing unlocks for creator editing.
4. **APPROVED / PUBLISHED**: Listing enters the public discovery index (`/buy`, `/rent`, `/properties`) with full searchability.
5. **UNDER_OFFER**: Listing has an active token/escrow agreement; search card displays "Under Offer" pill.
6. **SOLD / RENTED**: Deal concluded; listing is archived from active discovery and preserved in the owner's dashboard history.

---

## 2. Enquiry & Lead Management Workflow

```
[ Visitor on /property/[slug] ] ──> Submits Enquiry Form
                                           │
                                           ▼
                                 [ Zod Server Validation ]
                                           │
                                           ▼
                               [ Create Enquiry Record ]
                                           │
                                           ▼
                                [ Auto-Generate Lead ]
                                           │
                        ┌──────────────────┴──────────────────┐
                        ▼                                     ▼
             [ Owner / Agent Inbox ]              [ In-App Notification ]
                        │
                        ▼
               Update Status:
       NEW ──> CONTACTED ──> QUALIFIED ──> SITE_VISIT ──> CONVERTED / CLOSED
```

### Lead Handling Guarantees:
- **Masked Privacy**: Buyer contact numbers are safeguarded; direct tele-spam loops are blocked.
- **Activity History**: All status changes, notes, and call logs are immutably appended to the lead timeline.
- **Exporting**: Authorized brokers and owners can export their lead pipeline to CSV.

---

## 3. Site Visit Scheduling & Conflict Validation

```
[ Buyer on Property Page ] ──> Selects Date & Preferred Time Slot
                                              │
                                              ▼
                             [ Conflict & Double-Booking Check ]
                                              │
                              ┌───────────────┴───────────────┐
                              ▼                               ▼
                      [ Slot Occupied ]               [ Slot Available ]
                              │                               │
                              ▼                               ▼
                     Prompt Alternative               [ Status: REQUESTED ]
                                                              │
                                                              ▼
                                                   [ Agent Confirms / Reschedules ]
                                                              │
                                                              ▼
                                                     [ Status: CONFIRMED ]
                                                              │
                                                              ▼
                                                     [ Status: COMPLETED ]
```

---

## 4. Agent-to-Agent Lead Exchange & 50:50 Co-Broking

```
[ Agent A ] ──> Posts Buyer Requirement in Exchange (BHK, Budget, Locality)
                         │
                         ▼
             [ Public Exchange Directory ]
                         │
                         ▼ Discovered by Agent B (Matches Mandate)
[ Agent B ] ──> Submits Collaboration Request
                         │
                         ▼
[ Agent A ] ──> Evaluates Agent B Credentials & MahaRERA License
                         │
               ┌─────────┴─────────┐
               ▼                   ▼
          [ REJECTED ]       [ ACCEPTED ]
                                   │
                                   ▼
                      [ Execute 50:50 Commission Agreement ]
                                   │
                                   ▼
                      [ Reveal Contact Details & Deal Escrow ]
```

---

## 5. Construction Marketplace Quotation-First Workflow

```
[ Customer / Contractor ] ──> Discovers Materials (Cement, TMT Steel, Tiles)
                                           │
                                           ▼
                               [ Request Formal Quotation ]
                               (Volume / Delivery Pincode / Specs)
                                           │
                                           ▼
                                [ Supplier Lead Inbox ]
                                           │
                                           ▼
                               [ Supplier Prepares Quote ]
                              (Unit Price + Freight + GST)
                                           │
                               ┌───────────┴───────────┐
                               ▼                       ▼
                         [ ACCEPTED ]             [ REJECTED ]
                               │
                               ▼
                   [ Offline Order Fulfillment / Gateway Ready ]
```

