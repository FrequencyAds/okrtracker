import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create a demo user (using a fixed UUID for consistency)
  const demoUserId = '00000000-0000-0000-0000-000000000001'

  console.log('Creating demo user...')
  const user = await prisma.user.upsert({
    where: { id: demoUserId },
    update: {},
    create: {
      id: demoUserId,
      email: 'demo@okrtracker.com',
    },
  })

  console.log('Creating team members...')
  const teamMembers = [
    { id: '10000000-0000-0000-0000-000000000001', name: 'Colby', initials: 'CB', color: 'bg-blue-500' },
    { id: '10000000-0000-0000-0000-000000000002', name: 'Carrie', initials: 'CA', color: 'bg-emerald-500' },
    { id: '10000000-0000-0000-0000-000000000003', name: 'Chris', initials: 'CH', color: 'bg-violet-500' },
    { id: '10000000-0000-0000-0000-000000000004', name: 'Sam', initials: 'SM', color: 'bg-amber-500' },
    { id: '10000000-0000-0000-0000-000000000005', name: 'Jared', initials: 'JD', color: 'bg-pink-500' },
    { id: '10000000-0000-0000-0000-000000000006', name: 'Awais', initials: 'AW', color: 'bg-cyan-500' },
    { id: '10000000-0000-0000-0000-000000000007', name: 'Asim', initials: 'AS', color: 'bg-rose-500' },
    { id: '10000000-0000-0000-0000-000000000008', name: 'Fahad', initials: 'FH', color: 'bg-indigo-500' },
    { id: '10000000-0000-0000-0000-000000000009', name: 'Fabricio', initials: 'FB', color: 'bg-teal-500' },
    { id: '10000000-0000-0000-0000-00000000000a', name: 'Adnan', initials: 'AD', color: 'bg-purple-500' },
    { id: '10000000-0000-0000-0000-00000000000b', name: 'Flint', initials: 'FL', color: 'bg-orange-500' },
    { id: '10000000-0000-0000-0000-00000000000c', name: 'Pete', initials: 'PT', color: 'bg-lime-500' },
    { id: '10000000-0000-0000-0000-00000000000d', name: 'Dan', initials: 'DN', color: 'bg-fuchsia-500' },
    { id: '10000000-0000-0000-0000-00000000000e', name: 'Russell', initials: 'RS', color: 'bg-sky-500' },
    { id: '10000000-0000-0000-0000-00000000000f', name: 'Ivana', initials: 'IV', color: 'bg-red-500' },
  ]

  for (const member of teamMembers) {
    await prisma.person.upsert({
      where: { id: member.id },
      update: {},
      create: {
        id: member.id,
        name: member.name,
        initials: member.initials,
        color: member.color,
        userId: user.id,
      },
    })
  }

  const colby = await prisma.person.findFirst({ where: { id: '10000000-0000-0000-0000-000000000001' } })

  console.log('Creating objectives...')

  // Company Objective 1: Sell media, not just tools
  const co1 = await prisma.objective.create({
    data: {
      title: 'Sell media, not just tools',
      category: 'Company',
      description: 'Drive $3M in media revenue by shifting focus to value-based selling, securing net new brands, and expanding our SaaS footprint.',
      userId: user.id,
      keyResults: {
        create: [
          {
            title: 'Media Revenue',
            type: 'lagging',
            current: 0,
            target: 3000000,
            unit: '$',
          },
          {
            title: 'Net New Brands',
            type: 'leading',
            current: 0,
            target: 30,
            unit: 'brands',
          },
          {
            title: 'Average Deal Size',
            type: 'lagging',
            current: 0,
            target: 75000,
            unit: '$',
          },
          {
            title: 'Renewal Rate',
            type: 'lagging',
            current: 0,
            target: 50,
            unit: '%',
          },
          {
            title: 'SaaS / Ad Serving Revenue Growth',
            type: 'lagging',
            current: 0,
            target: 20,
            unit: '%',
          },
          {
            title: 'Make a sale',
            type: 'win_condition',
            current: 0,
            target: 40,
            unit: 'wins',
          },
          {
            title: 'Renew a campaign',
            type: 'win_condition',
            current: 0,
            target: 15,
            unit: 'renewals',
          },
        ],
      },
    },
  })

  // Company Objective 2: Become storytellers
  await prisma.objective.create({
    data: {
      title: 'Become storytellers',
      category: 'Company',
      description: 'Every touchpoint with the market should tell a compelling story about the future of audio.',
      userId: user.id,
    },
  })

  // Company Objective 3: Turn Frequency into a machine
  await prisma.objective.create({
    data: {
      title: 'Turn Frequency into a machine',
      category: 'Company',
      description: 'Operational excellence. Automate the mundane, focus on the creative.',
      userId: user.id,
    },
  })

  // Engineering Objectives
  await prisma.objective.create({
    data: {
      title: 'Build in Public',
      category: 'Engineering',
      description: 'Share our learnings, open source our utilities, and build a dev brand.',
      userId: user.id,
    },
  })

  await prisma.objective.create({
    data: {
      title: 'Strengthen Platform Security, Reliability, and Observability',
      category: 'Engineering',
      userId: user.id,
    },
  })

  await prisma.objective.create({
    data: {
      title: 'Contribution Parity Among All Team members',
      category: 'Engineering',
      userId: user.id,
    },
  })

  await prisma.objective.create({
    data: {
      title: 'Master Rapid Prototyping by Leveraging AI',
      category: 'Engineering',
      userId: user.id,
    },
  })

  // Product Objectives
  await prisma.objective.create({
    data: {
      title: 'Build Tools and Automations to Scale Our Marketplace',
      category: 'Product',
      description: 'Engineering builds what sales needs to sell media. Campaign management, reporting, inventory tools—everything that makes selling easier and running campaigns smoother.',
      initiatives: [
        'Build campaign management workflows that support full deal lifecycle',
        'Ship reporting and analytics that prove value to advertisers',
        'Automate ad ops friction (trafficking, make-goods, reconciliation)',
      ],
      userId: user.id,
      keyResults: {
        create: [
          {
            title: 'Workflow releases from gap list shipped',
            type: 'win_condition',
            current: 0,
            target: 20,
            unit: 'releases',
          },
          {
            title: 'Ad ops automation coverage',
            type: 'leading',
            current: 0,
            target: 100,
            unit: '%',
          },
          {
            title: 'Concurrent campaigns running without incident',
            type: 'lagging',
            current: 0,
            target: 30,
            unit: 'campaigns',
          },
        ],
      },
    },
  })

  await prisma.objective.create({
    data: {
      title: 'Ship the v2 Platform and Foundation Systems',
      category: 'Product',
      userId: user.id,
    },
  })

  await prisma.objective.create({
    data: {
      title: 'Build Roadmap Discipline That Earns Trust',
      category: 'Product',
      userId: user.id,
    },
  })

  // Marketing Objectives
  await prisma.objective.create({
    data: {
      title: 'Establish Automated Direct as a recognized buying category',
      category: 'Marketing',
      userId: user.id,
    },
  })

  await prisma.objective.create({
    data: {
      title: "Grow Frequency's brand awareness and credibility with agency and brand buyers",
      category: 'Marketing',
      userId: user.id,
    },
  })

  await prisma.objective.create({
    data: {
      title: 'Build a visible, credible brand voice for Frequency',
      category: 'Marketing',
      userId: user.id,
    },
  })

  await prisma.objective.create({
    data: {
      title: 'Generate Qualified Leads for Sales',
      category: 'Marketing',
      userId: user.id,
    },
  })

  // Sales Objectives
  await prisma.objective.create({
    data: {
      title: 'Make Media Sales the Dominant Source of Revenue',
      category: 'Sales',
      userId: user.id,
    },
  })

  await prisma.objective.create({
    data: {
      title: 'Build a Scalable, Diversified Advertiser Base for PPN',
      category: 'Sales',
      userId: user.id,
    },
  })

  await prisma.objective.create({
    data: {
      title: 'Protect and Expand Recurring License Revenue & Ad Serving',
      category: 'Sales',
      userId: user.id,
    },
  })

  // Success Objectives
  await prisma.objective.create({
    data: {
      title: 'Improve Customer Intelligence',
      category: 'Success',
      userId: user.id,
    },
  })

  await prisma.objective.create({
    data: {
      title: 'Expand Customer Revenue',
      category: 'Success',
      userId: user.id,
    },
  })

  await prisma.objective.create({
    data: {
      title: 'Increase Usage of the Product for Direct Sales',
      category: 'Success',
      userId: user.id,
    },
  })

  console.log('✅ Seed completed successfully!')
  console.log(`Created user: ${user.email}`)
  console.log(`Created ${3} team members`)
  console.log(`Created objectives with key results`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error during seed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
