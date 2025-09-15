export type IpifyResult = {
  ip: string;
  isp: string;
  as?: {
    asn?: number;
    name?: string;
    route?: string;
    domain?: string;
    type?: string;
  };
  location?: {
    country?: string;
    region?: string;
    timezone?: string;
  };
};
