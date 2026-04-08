# oncallhq-ai-intake-mvp

AI call intake + dispatch for home service businesses  
focused on one problem: missed calls = lost jobs

---

# OnCallHQ MVP

## context

i’ve been talking to contractors online(mostly plumbing / home services) and the same thing keeps coming up:

- they miss calls while on jobs  
- missed call usually means the customer just calls the next guy  
- answering services exist but honestly… they suck  
  - wrong pricing  
  - no real context  
  - bad handoff  

this MVP is just to test one thing:

**can we capture missed calls and turn them into clean, usable job info?**

not trying to build a full product yet  
just trying to prove the core loop works

---

## goal (v1)

when a contractor misses a call:

1. capture what the customer actually needs  
2. extract key info (issue, urgency, location, contact)  
3. send it cleanly to the contractor  
4. let them decide what to do  

if this works consistently → we have something real

---

## high level flow

customer calls → twilio number  

- if contractor answers → nothing happens  
- if missed → system kicks in  

AI flow:
- speech → text  
- understand request  
- extract structured data  
- classify urgency  
- create ticket  

output:
- sms to contractor (clean summary)  
- dashboard entry  

---

## what actually matters

- **no wrong pricing** (this kills trust instantly)  
- clean info, not long transcripts  
- fast response (few seconds max)  
- should work even if the caller is messy or unclear  

---

## what we are NOT doing (right now)

- no scheduling system  
- no payments  
- no CRM features  
- no over-engineering  

just intake + dispatch. nothing else.

---

## MVP stack (initial thinking)

- twilio → call handling  
- speech-to-text → transcription  
- llm → extraction + classification  
- backend → api + ticket creation  
- sms → contractor notification  
- simple dashboard → job view  

---

## open questions

- how accurate does extraction need to be before it's actually useful?  
- what kind of urgency classification do contractors care about?  
- is sms enough or do they expect auto-callback?  
- what builds trust fastest in this space?  

---

## definition of success

- contractors say: “this actually saves me jobs”  
- they respond to leads coming from this  
- they don’t complain about bad / wrong info  

if we hit that → we double down  
if not → we rethink fast  

---

## notes

this is intentionally simple  

we’re not building a “startup product” yet  
we’re testing if this problem is real enough and solvable  

everything here is flexible based on real feedback
