import axiosClient from "../../../app/services/axiosClient";

export interface OrderStatusItem {
  order_status_id: number;
  name: string;
}

export interface CommissionRow {
  orderId: number;
  orderType: string;
  productName: string;
  productModel: string;
  hsnCode: string;
  quantity: number;
  price: number;

  productCourierCharges: number;
  totalCourierCharges: number;

  orderStatus: string;
  dateAddedFormatted: string;

  // ❌ Commission related removed
  // commission: string;
  // platformFees: number;
  // forwardCourierCharges: number;
  // reverseCourierCharges: number;
  // rtoCharges: number;
  // bankSettlement: number;

  // debitNote: number;
  // debitNarration: string;
  // creditNote: number;
  // creditNarration: string;

  // totalDeduction: number;
  // netSettlementAmount: number;

  paymentStatus: string;
  paymentDate: string;
  referenceNumber: string;
}

const toNumber = (value: unknown, fallback = 0): number => {
  if (value === null || value === undefined || value === "") return fallback;

  const cleaned =
    typeof value === "string"
      ? value.replace(/[%₹,\s]/g, "").trim()
      : value;

  const num = Number(cleaned);
  return Number.isFinite(num) ? num : fallback;
};

const toText = (value: unknown, fallback = ""): string => {
  if (value === null || value === undefined) return fallback;
  const text = String(value).trim();
  return text || fallback;
};

const formatDateTime = (value: unknown, fallback = "N/A"): string => {
  if (!value) return fallback;

  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return String(value);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

/*
// ❌ Commission calculation disabled
const calculateCommission = (
  price: number,
  quantity: number,
  platformFees: number
): string => {
  const grossAmount = price * quantity;

  if (!grossAmount || grossAmount <= 0) return "0%";
  if (!platformFees || platformFees <= 0) return "0%";

  const percent = (platformFees / grossAmount) * 100;
  return `${percent.toFixed(2)}%`;
};
*/

// Order Status
export const fetchOrderStatus = async (): Promise<OrderStatusItem[]> => {
  try {
    const res = await axiosClient.get("/api/payment/order-statuses");
    return Array.isArray(res?.data?.data) ? res.data.data : [];
  } catch (error) {
    console.error("Error fetching order status:", error);
    return [];
  }
};

// Income Data
export const fetchIncomeData = async (
  dateStart: string = "",
  dateEnd: string = ""
) => {
  try {
    const res = await axiosClient.get("/api/payment/income", {
      params: {
        ...(dateStart && { dateStart }),
        ...(dateEnd && { dateEnd }),
        start: 0,
        limit: 10,
      },
    });

    return Array.isArray(res?.data?.data) ? res.data.data : [];
  } catch (error) {
    console.error("Error fetching income data:", error);
    return [];
  }
};

// Paid Product Details
export const fetchPaidProductDetails = async (orderId: number | string) => {
  const normalizedOrderId = String(orderId || "").trim();

  if (!normalizedOrderId) {
    throw new Error("Missing orderId");
  }

  const res = await axiosClient.get("/api/payment/paid-product-details", {
    params: {
      orderId: normalizedOrderId,
    },
  });

  return Array.isArray(res?.data?.data) ? res.data.data : [];
};

// Commission Data (without commission logic)
export const fetchCommissionData = async (
  dateStart: string = "",
  dateEnd: string = ""
): Promise<CommissionRow[]> => {
  try {
    const res = await axiosClient.get("/api/payment/commission", {
      params: {
        ...(dateStart && { dateStart }),
        ...(dateEnd && { dateEnd }),
        start: 0,
        limit: 20,
      },
    });

    const rawData = Array.isArray(res?.data?.data) ? res.data.data : [];

    return rawData.map((item: any) => {
      return {
        orderId: toNumber(item?.orderId),
        orderType: toText(item?.orderType, "-"),
        productName: toText(item?.productName, "-"),
        productModel: toText(item?.productModel, "-"),
        hsnCode: toText(item?.hsnCode, "-"),
        quantity: toNumber(item?.quantity),
        price: toNumber(item?.price),

        productCourierCharges: toNumber(
          item?.productCourierCharges ?? item?.courierRate
        ),
        totalCourierCharges: toNumber(item?.totalCourierCharges),

        orderStatus: toText(item?.orderStatus, "-"),
        dateAddedFormatted:
          toText(item?.dateAddedFormatted) ||
          formatDateTime(item?.dateAdded, "N/A"),

        paymentStatus: toText(item?.paymentStatus, ""),
        paymentDate: formatDateTime(item?.paymentDate, "N/A"),
        referenceNumber: toText(item?.referenceNumber, "N/A"),
      };
    });
  } catch (error: any) {
    console.error("Commission API Error:", error);
    return [];
  }
};