export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      channel_players: {
        Row: {
          channel_id: number
          created_at: string
          health_point: number | null
          id: number
          is_connected: boolean | null
          is_host: boolean | null
          is_winner: boolean | null
          role: Database["public"]["Enums"]["role"] | null
          user_id: number
          username: string | null
        }
        Insert: {
          channel_id: number
          created_at?: string
          health_point?: number | null
          id?: number
          is_connected?: boolean | null
          is_host?: boolean | null
          is_winner?: boolean | null
          role?: Database["public"]["Enums"]["role"] | null
          user_id: number
          username?: string | null
        }
        Update: {
          channel_id?: number
          created_at?: string
          health_point?: number | null
          id?: number
          is_connected?: boolean | null
          is_host?: boolean | null
          is_winner?: boolean | null
          role?: Database["public"]["Enums"]["role"] | null
          user_id?: number
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "channel_players_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channel_players_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      channels: {
        Row: {
          created_at: string
          id: number
          mines: number[] | null
          missiles: number[] | null
          name: string
          paused_at: string | null
          started_at: string | null
          status: Database["public"]["Enums"]["channel_status"]
        }
        Insert: {
          created_at?: string
          id?: number
          mines?: number[] | null
          missiles?: number[] | null
          name: string
          paused_at?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["channel_status"]
        }
        Update: {
          created_at?: string
          id?: number
          mines?: number[] | null
          missiles?: number[] | null
          name?: string
          paused_at?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["channel_status"]
        }
        Relationships: []
      }
      leaderboards: {
        Row: {
          created_at: string
          id: number
          point: number
          rank: number
          user_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          point: number
          rank: number
          user_id: number
        }
        Update: {
          created_at?: string
          id?: number
          point?: number
          rank?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "leaderboards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          device_id: string
          id: number
        }
        Insert: {
          created_at?: string
          device_id: string
          id?: number
        }
        Update: {
          created_at?: string
          device_id?: string
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      channel_status:
        | "created"
        | "waiting_players"
        | "selecting_roles"
        | "started"
        | "paused"
        | "ended"
      role: "pirate" | "marine"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
