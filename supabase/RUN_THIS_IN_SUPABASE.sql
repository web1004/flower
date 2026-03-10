-- 1. https://supabase.com/dashboard 접속
-- 2. 프로젝트 선택 → 왼쪽 메뉴 "SQL Editor" 클릭
-- 3. "New query" 클릭 후 아래 전체를 붙여넣기 → Run (또는 Ctrl+Enter)

CREATE TABLE IF NOT EXISTS public.customer_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.customer_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert for inquiries"
  ON public.customer_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated read"
  ON public.customer_inquiries
  FOR SELECT
  TO authenticated
  USING (true);

COMMENT ON TABLE public.customer_inquiries IS '랜딩페이지 고객 문의 (휴대전화, 문의내용)';
