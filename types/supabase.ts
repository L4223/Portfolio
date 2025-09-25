export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      brands: {
        Row: {
          id: string;
          name: string;
          country: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          country?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          country?: string | null;
        };
      };
      models: {
        Row: {
          id: string;
          brand_id: string;
          name: string;
          generation: string | null;
          years_from: number | null;
          years_to: number | null;
          summary_md: string | null;
        };
        Insert: {
          id?: string;
          brand_id: string;
          name: string;
          generation?: string | null;
          years_from?: number | null;
          years_to?: number | null;
          summary_md?: string | null;
        };
        Update: {
          id?: string;
          brand_id?: string;
          name?: string;
          generation?: string | null;
          years_from?: number | null;
          years_to?: number | null;
          summary_md?: string | null;
        };
      };
      community_reports: {
        Row: {
          id: string;
          model_id: string;
          user_id: string;
          mileage: number | null;
          engine_code: string | null;
          description: string;
          proof_url: string | null;
          occurred_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          model_id: string;
          user_id: string;
          mileage?: number | null;
          engine_code?: string | null;
          description: string;
          proof_url?: string | null;
          occurred_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          model_id?: string;
          user_id?: string;
          mileage?: number | null;
          engine_code?: string | null;
          description?: string;
          proof_url?: string | null;
          occurred_at?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
};
