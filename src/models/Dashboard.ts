type dashboardInfo = {
  totalUserCnt: number

  oneDayUserCnt: number

  weekUserCnt: number

  monthUserCnt: number

  deleteUserCnt: number
}

type donationDashboardInfo = {
  oneDayDonation: number
  weekDonation: number
  monthDonation: number
  totalDonation: number
}

type regularInfo = {
  beforeCnt: number
  underCnt: number
  successCnt: number
  successAmount: string
  regularCnt: number
  regularAmount: string
  beforeMonthRegularCnt: number
  beforeMonthRegularAmount: string
}
type getDashboardResponse = dashboardInfo

type getDonationDashboardResponse = donationDashboardInfo

type getRegularDashboardResponse = regularInfo
