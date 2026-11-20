import type { Assignment } from "./assignment.type";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export interface Payment {
  id: string;

  status: PaymentStatus;

  amount: number;
  currency: string;

  paymentGateway: string;
  merchantInvoiceNumber: string;

  bkashPaymentId?: string;
  bkashTrxId?: string;
  payerReference?: string;
  paidAt?: string;

  // biome-ignore lint/suspicious/noExplicitAny: <sdf>
  gatewayResponse?: any;

  refundTrxId?: string;
  refundAmount?: string;
  refundReason?: string;
  refundedAt?: string;

  assignmentId: string;
  assignment: Assignment;

  createdAt: string;
  updatedAt: string;
}

export interface PaymentParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "desc" | "asc";
  status?: PaymentStatus;
  searchTerm?: string;
}

export interface MyPaymentParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "desc" | "asc";
  status?: PaymentStatus;
  searchTerm?: string;
}

export interface PayServiceRequestPayload {
  requestId: string;
}