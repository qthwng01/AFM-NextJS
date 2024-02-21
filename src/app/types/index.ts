export interface ImageProps {
  id: number
  height: string
  width: string
  src: string
  alt: string
}

export interface ProductProps {
  id: string
  sku: null | string | number
  url: null | string | number
  branch: null | string | number
  thumbImage: string
  startedAt: string
  endedAt: string
  commissionType: string
  commissionValue: number
  position: number
  maxCommissionRate: number
  maxCommissionValue: number
  status: number
  createdAt: string
  updatedAt: string
  productSupplierId: number
  brandId: number
  productTypeId: null
  sortOrder: number
  price: number
  quantity: number
  name: string
  isHot: boolean
  rateNumber: number
  voteTotal: number
  voteNumberStars: number
  supplierId: number
  priceBeforeDiscount: number
  nameEn: string
  isPolicyWholesale: boolean
  shipPrice: string
  priceRange: string[]
  supplierInfo: string
  rangePrice: null | number
  discountAmount: number
  discountType: string
  countOrder: number
  totalSelling: number
  advanceInfo: {}[]
}

export interface ProductDetailProps extends ProductProps {
  data: ProductDetailProps
  description: string
  nameEn: string
  isPolicyWholesale: boolean
  shipPrice: string
  categoryId: null
  companyId: number
  slug: string
  paymentTotal: number
  rateNumber: number
  wholesalePrice: null
  attributeData: {
    weight: number
    width: number
    length: number
    height: number
    advanceInfo: []
  }
  userId: number
  userName: string
  position: number
  voteTotal: number
  voteNumberStars: number
  rangePrice: null
  reasonCancel: null
  skuStock: string
  brand: string
  categoryName: null
  images: string[]
  videos: []
  contents: [
    {
      id: null
      content: string
      productId: number
      createdAt: string
      updatedAt: string
      advanceInfo: []
    }
  ]
  colors: string[] | number[]
  sizes: string[] | number[]
  campaigns: {
    id: number
    d2CCampaignId: number
    name: string
    code: string
    status: number
    logo: string
    averagePayment: number
    advanceInfo?: []
  }
  variations: []
  productVariations: []
  averageTime: null
  supplier: {
    id: number
    d2c_company_id: number
    code: string
    name: string
    phone: string
    status: number
    email: string
    website: null
    logo: null
    created_at: string
    updated_at: string
    totalSelling: number
    d2cCompanyId: number
  }
}

export interface CategoryProps {
  id: number
  name: string
  code: string
  image: string
  banner: {}[]
  hot: number
  status: number
  createdAt: string
  updatedAt: string
  categoryId: number
  supplierId: number
}

export interface VoucherProps {
  aff_link: string
  aff_link_campaign_tag?: string
  banner?: {}[]
  campaign: string
  campaign_id: string
  campaign_name: string
  categories: [
    {
      category_name: string
      category_name_show: string
      category_no: '' | string
    }
  ]
  coin_cap: number
  coin_percentage: number
  content: string
  coupons: [
    {
      coupon_code: string
      coupon_desc: string
      coupon_save: string
      coupon_type: number
    }
  ]
  discount_percentage: number
  discount_value: number
  domain: string
  end_time: string
  id: string
  image: string
  is_hot: string
  keyword: []
  link: string
  max_value: number
  merchant: string
  min_spend: number
  name: string
  prior_type: number
  remain: number
  remain_true: boolean
  shop_id: number
  start_time: string
  status: number
  time_left: string
}

export interface BrandProps {
  length: number
  id: number
  name: string
  code: string
  image: string
  banner?: [] | undefined
  hot: number
  status: number
  createdAt: string
  updatedAt: string
  categoryId: number
  supplierId: number
}

export interface CartProps {
  userId: string | null
  quantity: number
  productId: string
  productName: string
  productPrice: number
  productImage: string
}

export interface ProvinceProps {
  province_id: string
  province_name: string
  province_type: string
}

export interface DistrisctProps {
  district_id: string
  district_name: string
  district_type: string
  lat: null
  lng: null
  province_id: string
}

export interface WardProps {
  district_id: string
  ward_id: string
  ward_name: string
  ward_type: string
}

export interface IOrder {
  createdAt: string
  city: string
  mail: string
  fullname: string
  phone: string
  orderID: string
  updatedAt: string
  ward: string
  userID: string
  address: string
  status: string
  total: number
  district: string
  data: IDataOrder[]
}

export interface IDataOrder extends IOrder {
  quantity: number
  productID: string
  productImage: string
  productPrice: number
  productName: string
}
