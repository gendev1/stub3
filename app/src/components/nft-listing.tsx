'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function NFTListing() {
  const [nftData, setNftData] = useState({
    tokenAddress: '',
    price: '',
  })
  const [isListing, setIsListing] = useState(false)
  const [listingStatus, setListingStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNftData({
      ...nftData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsListing(true)
    setListingStatus('idle')

    try {
      // Here you would typically interact with your Solana program to list the NFT
      // This is a placeholder for the actual Solana interaction
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulating network request
      
      console.log('Listing NFT:', nftData)
      setListingStatus('success')
    } catch (error) {
      console.error('Error listing NFT:', error)
      setListingStatus('error')
    } finally {
      setIsListing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>List Your NFT Ticket</CardTitle>
          <CardDescription>Enter the details of your NFT ticket to list it for sale</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tokenAddress">NFT Token Address</Label>
              <Input
                id="tokenAddress"
                name="tokenAddress"
                value={nftData.tokenAddress}
                onChange={handleInputChange}
                placeholder="Enter the Solana token address"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Listing Price (SOL)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.000000001"
                value={nftData.price}
                onChange={handleInputChange}
                placeholder="Enter the price in SOL"
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            type="submit" 
            className="w-full" 
            onClick={handleSubmit}
            disabled={isListing}
          >
            {isListing ? 'Listing...' : 'List NFT for Sale'}
          </Button>
          {listingStatus === 'success' && (
            <Alert variant="default">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your NFT has been successfully listed for sale.
              </AlertDescription>
            </Alert>
          )}
          {listingStatus === 'error' && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                There was an error listing your NFT. Please try again.
              </AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}