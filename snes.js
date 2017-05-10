const Beam = require('beam-client-node')
const Interactive = require('beam-interactive-node')
const { keyToggle } = require('robotjs')
const config = require('./config')

const channelId = config.channelId

const beam = new Beam()

beam.use('oauth', {
  tokens: {
    access: config.accessToken,
    expires: Date.now() + (365 * 24 * 60 * 60 * 1000)
  },
})

beam.request('GET', `users/current`)
.then(() => beam.game.join(channelId))
.then(res => createRobot(res))
.then(robot => performRobotHandShake(robot))
.then(robot => setupRobotEvents(robot))
.catch(err => {
  if (err.res) {
    throw new Error('Error connecting to Interactive:' + err.res.body.message)
  }
  throw new Error('Error connecting to Interactive', err)
})

function createRobot(res) {
  return new Interactive.Robot({
    remote: res.body.address,
    channel: channelId,
    key: res.body.key,
  })
}

function performRobotHandShake(robot) {
  return new Promise((resolve, reject) => {
    robot.handshake(err => {
      if (err) {
        reject(err)
      }
      resolve(robot)
    })
  })
}

function setupRobotEvents(robot) {
  let udlr = { u: 'up', d: 'up', 'l': 'up', r: 'up' }

  function k(key, status) {
    if (udlr[key[0]] != status) {
      udlr[key[0]] = status
      keyToggle(key, status)
      console.log(key, status)
    }
  }

  robot.on('report', report => {
    if (report.joystick.length > 0) {
      let { x, y } = report.joystick[0].coordMean
      
      if (isNaN(x)) x = 0
      if (isNaN(y)) y = 0
    
      if (x > 0.3)
        k('right', 'down')
      else
        k('right', 'up')

      if (x < -0.3)
        k('left', 'down')
      else
        k('left', 'up')

      if (y > 0.3)
        k('down', 'down')
      else
        k('down', 'up')

      if (y < -0.3)
        k('up', 'down')
      else
        k('up', 'up')
    }

    // buttons
    btn('x', report.tactile[0])
    btn('z', report.tactile[1])
    btn('enter', report.tactile[2])
  })

  robot.on('error', err => {
    throw new Error('There was an error in the Interactive connection', err)
  })
}

function btn(key, data) {
  let { pressFrequency, releaseFrequency } = data

  if (pressFrequency > releaseFrequency) {
    keyToggle(key, 'down')
    console.log(key, 'down')
  }

  if (releaseFrequency < pressFrequency) {
    keyToggle(key, 'up')
    console.log(key, 'up')
  }
}
