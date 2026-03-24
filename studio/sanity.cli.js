import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '9wvm16ml',
    dataset: 'production'
  },
  deployment: {
    appId: 'ty4mxopt6tkkpe6vv57g3ztu',
    autoUpdates: true,
  }
})
