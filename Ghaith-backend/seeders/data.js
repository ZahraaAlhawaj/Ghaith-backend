const mongoose = require('mongoose')
const { Charity, User } = require('../models')
require('dotenv').config()
const { hashPassword } = require('../middleware')

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('Successfully connected to MongoDB . . .')
  })
  .catch((e) => {
    console.error('Connection error', e.message)
  })

const createData = async () => {
  let users = [
    {
      name: 'Tasneem Ali',
      email: 'tasneemali@gmail.com',
      phone_number: '1234567890',
      passwordDigest: await hashPassword('ghaith123'),
      role: 'Admin',
      onboarding: true
    },
    {
      name: 'Zahraa Ali',
      email: 'zahraaali@gmail.com',
      phone_number: '1234567890',
      passwordDigest: await hashPassword('ghaith123'),
      role: 'Admin',
      onboarding: true
    },
    {
      name: 'Zahraa Alhawaj',
      email: 'zahraaalhawaj@gmail.com',
      phone_number: '1234567890',
      passwordDigest: await hashPassword('ghaith123'),
      role: 'Admin',
      onboarding: true
    },
    {
      name: 'Esra Ashoor',
      email: 'asraashoor@gmail.com',
      phone_number: '1234567890',
      passwordDigest: await hashPassword('ghaith123'),
      role: 'Admin',
      onboarding: true
    },
    {
      name: 'Christopher Brown',
      email: 'christopherbrown@gmail.com',
      phone_number: '1234567890',
      passwordDigest: await hashPassword('ghaith123'),
      role: 'Admin',
      onboarding: true
    },
    {
      name: 'Jessica Jones',
      email: 'jessicajones@gmail.com',
      phone_number: '1234567890',
      passwordDigest: await hashPassword('ghaith123'),
      role: 'Admin',
      onboarding: true
    },
    {
      name: 'David Davis',
      email: 'daviddavis@gmail.com',
      phone_number: '1234567890',
      passwordDigest: await hashPassword('ghaith123'),
      role: 'Admin',
      onboarding: true
    },
    {
      name: 'Sarah Miller',
      email: 'darahmiller@gmail.com',
      phone_number: '1234567890',
      passwordDigest: await hashPassword('ghaith123'),
      role: 'Admin',
      onboarding: true
    }
  ]

  let charities = [
    {
      name: 'Share Joy',
      logo: 'https://i.ibb.co/3YcyGtb/logo6.png',
      googlemaplink:
        'https://www.google.com/maps/place/Bahrain+Institute+of+Banking+and+Finance+(BIBF)/@26.2427273,50.5748434,15z/data=!4m6!3m5!1s0x3e49a8d1f03b1701:0xd415be5ff2b43933!8m2!3d26.2427273!4d50.5748434!16s%2Fg%2F1tmpcdq5?entry=ttu',
      location: {
        type: 'Point',
        coordinates: [26.2427273, 50.5748434]
      },
      cr_number: '123456789',
      donations: [],
      status: 'Approved'
    },
    {
      name: 'Help Now',
      logo: 'https://i.ibb.co/wd6SYxy/logo8.png',
      googlemaplink:
        'https://www.google.com/maps/place/Bahrain+Institute+of+Banking+and+Finance+(BIBF)/@26.2427273,50.5748434,15z/data=!4m6!3m5!1s0x3e49a8d1f03b1701:0xd415be5ff2b43933!8m2!3d26.2427273!4d50.5748434!16s%2Fg%2F1tmpcdq5?entry=ttu',
      location: {
        type: 'Point',
        coordinates: [26.2427273, 50.5748434]
      },
      cr_number: '123456789',
      donations: [],
      status: 'Approved'
    },
    {
      name: 'Together',
      logo: 'https://i.ibb.co/09K6bvH/logo9.png',
      googlemaplink: 'https://www.google.com/maps/place/World+Wildlife+Fund',
      location: {
        type: 'Point',
        coordinates: [38.9072, -77.0369]
      },
      cr_number: '987654321',
      donations: [],
      status: 'Approved'
    },
    {
      name: 'Heal',
      logo: 'https://i.ibb.co/L1rqkvZ/logo10.png',
      googlemaplink: 'https://www.google.com/maps/place/UNICEF',
      location: {
        type: 'Point',
        coordinates: [-1.2921, 36.8219]
      },
      cr_number: '246813579',
      donations: [],
      status: 'Approved'
    },
    {
      name: 'Hope',
      logo: 'https://i.ibb.co/Tw8S7PS/logo13.png',
      googlemaplink: 'https://www.google.com/maps/place/Oxfam',
      location: {
        type: 'Point',
        coordinates: [51.5074, -0.1278]
      },
      cr_number: '135792468',
      donations: [],
      status: 'Approved'
    },
    {
      name: 'AidReach',
      logo: 'https://i.ibb.co/QP7s52k/logo1.png',
      googlemaplink: 'https://www.google.com/maps/place/Habitat+for+Humanity',
      location: {
        type: 'Point',
        coordinates: [33.7489954, -84.3879824]
      },
      cr_number: '987654321',
      donations: [],
      status: 'Approved'
    },
    {
      name: 'Rise Up',
      logo: 'https://i.ibb.co/fMZFzxq/logo2.png',
      googlemaplink: 'https://www.google.com/maps/place/Amnesty+International',
      location: {
        type: 'Point',
        coordinates: [52.52, 13.405]
      },
      cr_number: '123456789',
      donations: [],
      status: 'Approved'
    },
    {
      name: 'Care Net',
      logo: 'https://i.ibb.co/RcgrHzK/logo3.png',
      googlemaplink: 'https://www.google.com/maps/place/American+Red+Cross',
      location: {
        type: 'Point',
        coordinates: [40.7128, -74.006]
      },
      cr_number: '246813579',
      donations: [],
      status: 'Approved'
    }
  ]

  await User.deleteMany({ role: 'Admin' })
  await Charity.deleteMany({})
  console.log('Creating data . . .')
  for (let i = 0; i < users.length; i++) {
    const addedUser = await User.create(users[i])
    const addedCharity = await Charity.create(charities[i])

    addedCharity.user = addedUser._id
    await addedCharity.save()
  }
  console.log('Data created!')
  mongoose.connection.close()
}

createData()
