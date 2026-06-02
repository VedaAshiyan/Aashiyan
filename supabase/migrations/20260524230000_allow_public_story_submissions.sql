/*
  # Allow public story submissions

  The story form runs with the Supabase anon key. The original blogs insert
  policy only allowed authenticated users, so public submissions failed with:
  "new row violates row-level security policy for table blogs".
*/

CREATE POLICY "Anyone can submit stories"
  ON blogs FOR INSERT
  TO anon
  WITH CHECK (true);
