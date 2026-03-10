-- 고객 문의 저장 테이블 (Supabase SQL Editor에서 실행)
-- Dashboard → SQL Editor → New query → 아래 SQL 붙여넣기 후 Run

CREATE TABLE IF NOT EXISTS public.customer_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Row Level Security 활성화
ALTER TABLE public.customer_inquiries ENABLE ROW LEVEL SECURITY;

-- 랜딩페이지에서 익명 사용자가 문의만 등록할 수 있도록 (INSERT 허용)
CREATE POLICY "Allow anonymous insert for inquiries"
  ON public.customer_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 문의 목록 조회는 인증된 사용자만 (Dashboard/관리용, 필요 시 service_role 사용)
CREATE POLICY "Allow authenticated read"
  ON public.customer_inquiries
  FOR SELECT
  TO authenticated
  USING (true);

-- (선택) 서비스 역할로만 조회하려면 위 SELECT 정책 대신 아래 사용
-- CREATE POLICY "Allow service role read"
--   ON public.customer_inquiries FOR SELECT TO service_role USING (true);

COMMENT ON TABLE public.customer_inquiries IS '랜딩페이지 고객 문의 (휴대전화, 문의내용)';
