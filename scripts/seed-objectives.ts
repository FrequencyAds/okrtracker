import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
// Use service role key for admin access
const supabaseKey = 'sb_secret_CdCAUp_y0EhGtITXuwkp8A_8JkFBj0T';

if (!supabaseUrl) {
  console.error('❌ Missing Supabase URL');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const objectives = [
  {
    title: 'Sell media, not just tools',
    category: 'Company',
    description: 'Transform our business model from tool provider to media company',
    initiatives: [
      'Develop content strategy',
      'Build media distribution channels',
      'Create compelling media products'
    ]
  },
  {
    title: 'Become storytellers',
    category: 'Company',
    description: 'Shift our culture and capabilities toward narrative-driven communication',
    initiatives: [
      'Train team in storytelling techniques',
      'Build story-first content creation process',
      'Showcase customer success stories'
    ]
  },
  {
    title: 'Turn Frequency into a machine',
    category: 'Company',
    description: 'Systematize and scale Frequency operations for maximum efficiency',
    initiatives: [
      'Document all processes',
      'Automate repetitive tasks',
      'Build scalable systems and workflows'
    ]
  }
];

async function seedObjectives() {
  try {
    console.log('🌱 Starting seed process...\n');
    console.log('🔑 Using service role key for admin access\n');

    // Query for existing users (service role key bypasses RLS)
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, email')
      .limit(10);

    if (usersError) {
      console.error(`❌ Error fetching users: ${usersError.message}`);
      process.exit(1);
    }

    if (!users || users.length === 0) {
      console.error('❌ No users found in database.');
      console.log('\nPlease create a user first by:');
      console.log('1. Run the app (npm run dev)');
      console.log('2. Sign up with an email/password\n');
      process.exit(1);
    }

    // Use the first user, or let user specify via command line
    const userEmail = process.argv[2];
    let targetUser = users[0];

    if (userEmail) {
      const foundUser = users.find(u => u.email === userEmail);
      if (foundUser) {
        targetUser = foundUser;
      } else {
        console.log(`⚠️  User ${userEmail} not found, using first user instead`);
      }
    }

    console.log(`✓ Using user: ${targetUser.email}`);
    console.log(`✓ User ID: ${targetUser.id}\n`);

    // Insert objectives
    for (const obj of objectives) {
      console.log(`📝 Creating objective: "${obj.title}"`);

      const { data, error } = await supabase
        .from('objectives')
        .insert({
          user_id: targetUser.id,
          title: obj.title,
          category: obj.category,
          description: obj.description,
          initiatives: obj.initiatives
        })
        .select()
        .single();

      if (error) {
        console.error(`   ❌ Error: ${error.message}`);
      } else {
        console.log(`   ✓ Created with ID: ${data.id}`);
      }
    }

    console.log('\n🎉 Seed complete!\n');
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Unexpected error:', error.message);
    process.exit(1);
  }
}

seedObjectives();
