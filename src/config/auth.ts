export default {
  jwt: {
    privateKey: process.env.JWT_PRIVATE_KEY || 'default',
    publicKey: process.env.JWT_PUBLIC_KEY || 'default',
    expiresIn: '1d'
  }
}
