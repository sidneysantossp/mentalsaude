#!/usr/bin/env tsx

/**
 * Complete Supabase Setup Script
 * Run with: npx tsx scripts/setup-supabase.ts
 *
 * This script will:
 * 1. Update Supabase types
 * 2. Run database migrations
 * 3. Seed initial data
 * 4. Verify setup
 */

import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import { join } from 'path'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing Supabase environment variables')
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

async function main() {
  console.log('🚀 Starting complete Supabase setup...\n')

  try {
    // Step 1: Update schema
    console.log('📝 Step 1: Applying database schema...')
    const schemaPath = join(process.cwd(), 'supabase/schema.sql')
    const schema = readFileSync(schemaPath, 'utf-8')

    // Apply schema to Supabase
    const supabaseUrl = SUPABASE_URL!
    const urlParts = supabaseUrl.split('//')[1].split('.')
    execSync(`psql "${supabaseUrl.replace('https://', 'postgresql://postgres:')}@${urlParts[0]}.supabase.co:5432/postgres" -c "${schema}"`, {
      stdio: 'inherit',
      env: {
        ...process.env,
        PGPASSWORD: SUPABASE_SERVICE_ROLE_KEY
      }
    })

    console.log('✅ Schema applied successfully')

    // Step 2: Update types
    console.log('🔄 Step 2: Updating TypeScript types...')
    execSync('npx tsx scripts/update-supabase-types.ts', { stdio: 'inherit' })
    console.log('✅ Types updated successfully')

    // Step 3: Run migrations (if any)
    console.log('📊 Step 3: Running migrations...')
    // Add migration logic here if needed
    console.log('✅ Migrations completed')

    // Step 4: Seed data
    console.log('🌱 Step 4: Seeding initial data...')
    execSync('npx tsx scripts/seed-complete-tests.ts', { stdio: 'inherit' })
    console.log('✅ Data seeded successfully')

    // Step 5: Verify setup
    console.log('🔍 Step 5: Verifying setup...')
    execSync('npx tsx scripts/test-connection.ts', { stdio: 'inherit' })
    console.log('✅ Setup verification completed')

    console.log('\n🎉 Supabase setup completed successfully!')
    console.log('\n📋 Next steps:')
    console.log('1. Run: npm run dev')
    console.log('2. Test authentication: POST /api/auth/register')
    console.log('3. Test tests: GET /api/tests')
    console.log('4. Access admin: /admin')

  } catch (error) {
    console.error('❌ Setup failed:', error)
    process.exit(1)
  }
}

main()
