import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface User {
  id: string
  name: string
  email: string
  raw_json: any
  created_at: string
  updated_at: string
  deleted_at?: string
}

export class DatabaseService {
  static async getAllUsers(): Promise<User[]> {
    try {
      const users = await sql`
        SELECT id, name, email, raw_json, created_at, updated_at, deleted_at
        FROM neon_auth.users_sync
        WHERE deleted_at IS NULL
        ORDER BY created_at DESC
      `
      return users as User[]
    } catch (error) {
      console.error("Error fetching users:", error)
      throw new Error("Failed to fetch users from database")
    }
  }

  static async getUserById(id: string): Promise<User | null> {
    try {
      const users = await sql`
        SELECT id, name, email, raw_json, created_at, updated_at, deleted_at
        FROM neon_auth.users_sync
        WHERE id = ${id} AND deleted_at IS NULL
      `
      return (users[0] as User) || null
    } catch (error) {
      console.error("Error fetching user by ID:", error)
      throw new Error("Failed to fetch user from database")
    }
  }

  static async createUser(userData: {
    id: string
    name: string
    email: string
    raw_json: any
  }): Promise<User> {
    try {
      const users = await sql`
        INSERT INTO neon_auth.users_sync (id, name, email, raw_json, created_at, updated_at)
        VALUES (${userData.id}, ${userData.name}, ${userData.email}, ${JSON.stringify(userData.raw_json)}, NOW(), NOW())
        RETURNING id, name, email, raw_json, created_at, updated_at, deleted_at
      `
      return users[0] as User
    } catch (error) {
      console.error("Error creating user:", error)
      throw new Error("Failed to create user in database")
    }
  }

  static async updateUser(
    id: string,
    updates: {
      name?: string
      email?: string
      raw_json?: any
    },
  ): Promise<User | null> {
    try {
      const setClause = []
      const values = []

      if (updates.name) {
        setClause.push(`name = $${setClause.length + 1}`)
        values.push(updates.name)
      }

      if (updates.email) {
        setClause.push(`email = $${setClause.length + 1}`)
        values.push(updates.email)
      }

      if (updates.raw_json) {
        setClause.push(`raw_json = $${setClause.length + 1}`)
        values.push(JSON.stringify(updates.raw_json))
      }

      setClause.push(`updated_at = NOW()`)

      const users = await sql`
        UPDATE neon_auth.users_sync 
        SET ${sql.unsafe(setClause.join(", "))}
        WHERE id = ${id} AND deleted_at IS NULL
        RETURNING id, name, email, raw_json, created_at, updated_at, deleted_at
      `

      return (users[0] as User) || null
    } catch (error) {
      console.error("Error updating user:", error)
      throw new Error("Failed to update user in database")
    }
  }

  static async deleteUser(id: string): Promise<boolean> {
    try {
      const result = await sql`
        UPDATE neon_auth.users_sync 
        SET deleted_at = NOW()
        WHERE id = ${id} AND deleted_at IS NULL
      `
      return result.length > 0
    } catch (error) {
      console.error("Error deleting user:", error)
      throw new Error("Failed to delete user from database")
    }
  }

  static async getCommunityStats() {
    try {
      const stats = await sql`SELECT * FROM community_stats`
      return stats[0] || {}
    } catch (error) {
      console.error("Error fetching community stats:", error)
      throw new Error("Failed to fetch community statistics")
    }
  }
}
