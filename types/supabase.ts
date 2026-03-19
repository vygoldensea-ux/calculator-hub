import type { CalculatorFormValues, CalculatorResultView } from "@/types/calculator";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    CompositeTypes: Record<string, never>;
    Enums: Record<string, never>;
    Functions: Record<string, never>;
    Tables: {
      calculator_runs: {
        Insert: {
          calculator_slug: string;
          created_at?: string;
          id?: string;
          inputs: CalculatorFormValues;
          result: CalculatorResultView;
          user_id?: string;
        };
        Relationships: [];
        Row: {
          calculator_slug: string;
          created_at: string;
          id: string;
          inputs: CalculatorFormValues;
          result: CalculatorResultView;
          user_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["calculator_runs"]["Insert"]>;
      };
      lead_forms: {
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          message?: string | null;
          name?: string | null;
          source?: string | null;
        };
        Relationships: [];
        Row: {
          created_at: string;
          email: string;
          id: string;
          message: string | null;
          name: string | null;
          source: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["lead_forms"]["Insert"]>;
      };
      newsletter_subscribers: {
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          source?: string | null;
          status?: string;
        };
        Relationships: [];
        Row: {
          created_at: string;
          email: string;
          id: string;
          source: string | null;
          status: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["newsletter_subscribers"]["Insert"]
        >;
      };
      profiles: {
        Insert: {
          created_at?: string;
          email: string | null;
          id: string;
          updated_at?: string;
        };
        Relationships: [];
        Row: {
          created_at: string;
          email: string | null;
          id: string;
          updated_at: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      saved_calculations: {
        Insert: {
          calculator_slug: string;
          created_at?: string;
          id?: string;
          inputs: CalculatorFormValues;
          is_pinned?: boolean;
          label?: string | null;
          result: CalculatorResultView;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
        Row: {
          calculator_slug: string;
          created_at: string;
          id: string;
          inputs: CalculatorFormValues;
          is_pinned: boolean;
          label: string | null;
          result: CalculatorResultView;
          updated_at: string;
          user_id: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["saved_calculations"]["Insert"]
        >;
      };
    };
    Views: Record<string, never>;
  };
};

export type CalculatorRunRow =
  Database["public"]["Tables"]["calculator_runs"]["Row"];
export type SavedCalculationRow =
  Database["public"]["Tables"]["saved_calculations"]["Row"];
