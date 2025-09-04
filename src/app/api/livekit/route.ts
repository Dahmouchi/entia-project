import { NextRequest, NextResponse } from 'next/server'
import { AccessToken } from 'livekit-server-sdk'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { roomName, participantName, role = 'participant' } = body

    if (!roomName || !participantName) {
      return NextResponse.json(
        { error: 'Room name and participant name are required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.LIVEKIT_API_KEY
    const apiSecret = process.env.LIVEKIT_API_SECRET
    const wsUrl = process.env.LIVEKIT_URL

    if (!apiKey || !apiSecret || !wsUrl) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const at = new AccessToken(apiKey, apiSecret, {
      identity: participantName,
      ttl: '10m',
    })

    if (role === 'teacher') {
      at.addGrant({
        room: roomName,
        roomJoin: true,
        canPublish: true,
        canSubscribe: true,
        canPublishData: true,
        canUpdateOwnMetadata: true,
        roomAdmin: true,
        roomCreate: true,
      })
    } else {
      at.addGrant({
        room: roomName,
        roomJoin: true,
        canPublish: false,
        canSubscribe: true,
        canPublishData: true,
        canUpdateOwnMetadata: true,
      })
    }

    const token = await at.toJwt()

    return NextResponse.json({
      token,
      wsUrl,
      roomName,
      participantName,
      role,
    })

  } catch (error) {
    console.error('Error generating LiveKit token:', error)
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    )
  }
}
