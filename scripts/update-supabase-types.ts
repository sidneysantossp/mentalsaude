#!/usr/bin/env tsx

/**
 * Script to update Supabase TypeScript types
 * Run with: npx tsx scripts/update-supabase-types.ts
 */

import { execSync } from 'child_process'
import { writeFileSync } from 'fs'
import { join } from 'path'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing Supabase environment variables')
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

try {
  console.log('🔄 Generating Supabase types...')

  // Generate types using Supabase CLI
  const typesOutput = execSync(
    `npx supabase gen types typescript --project-id=${SUPABASE_URL.split('//')[1].split('.')[0]} --schema=public`,
    {
      env: {
        ...process.env,
        SUPABASE_ACCESS_TOKEN: SUPABASE_SERVICE_ROLE_KEY
      },
      encoding: 'utf-8'
    }
  )

  // Add custom header comment
  const headerComment = `/**
 * Supabase Database Types
 *
 * Generated automatically - DO NOT EDIT MANUALLY
 * Run: npx tsx scripts/update-supabase-types.ts
 */

`

  const finalOutput = headerComment + typesOutput

  // Write to types file
  const typesPath = join(process.cwd(), 'src/types/supabase.ts')
  writeFileSync(typesPath, finalOutput, 'utf-8')

  console.log('✅ Supabase types updated successfully!')
  console.log(`📁 Types written to: ${typesPath}`)

} catch (error) {
  console.error('❌ Failed to generate Supabase types:', error)
  process.exit(1)
}
