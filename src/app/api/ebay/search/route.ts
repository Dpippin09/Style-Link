import { NextRequest, NextResponse } from 'next/server';

const EBAY_API_ENDPOINT = 'https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search';
const EBAY_OAUTH_TOKEN = 'v^1.1#i^1#r^0#f^0#I^3#p^1#t^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';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const limit = searchParams.get('limit') || '12';

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const url = `${EBAY_API_ENDPOINT}?q=${encodeURIComponent(query)}&limit=${limit}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${EBAY_OAUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `eBay API error: ${response.status} ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch from eBay API', details: error },
      { status: 500 }
    );
  }
}
