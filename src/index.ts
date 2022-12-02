enum PaymentType {
  installments = "installments",
  cash = "cash",
}

type CustomerConditionsProps = {
  isFirstPurchase: boolean;
  paymentType: PaymentType;
  purchaseValue: number;
};

type Conditions = {
  [key: string]: (
    customerCondition: CustomerConditionsProps
  ) => false | "30%" | "25%" | "20%" | "15%" | "10%" | "5%" | "Sem desconto";
};

const customerCondition: CustomerConditionsProps = {
  isFirstPurchase: true,
  paymentType: PaymentType.cash,
  purchaseValue: 1500,
};

function discountGenerator({
  isFirstPurchase,
  paymentType,
  purchaseValue,
}: CustomerConditionsProps) {
  const firstPurchaseAndCashPagament =
    isFirstPurchase === true && paymentType === "cash";

  const firstPurchaseAndInstallmentsPagament =
    isFirstPurchase === true && paymentType === "installments";

  const notFirstPurchaseAndCashPagament =
    isFirstPurchase === false && paymentType === "cash";

  const notFirstPurchaseAndInstallmentsPagament =
    isFirstPurchase === false && paymentType === "installments";

  const purchaseIsAboveThousand = purchaseValue > 1000;
  const purchaseIsBelowThousand = purchaseValue < 1000;
  const purchaseIsBelowFiveHundred = purchaseValue < 500;
  const purchaseBetweenFiveHundredAndThousand =
    purchaseValue >= 500 && purchaseValue <= 1000;

  const conditions: Conditions = {
    firstPurchaseAndCashPagament: () => {
      if (!firstPurchaseAndCashPagament) return false;
      return purchaseIsAboveThousand
        ? "30%"
        : purchaseIsBelowThousand && !purchaseIsBelowFiveHundred
        ? "25%"
        : "20%";
    },
    firstPurchaseAndInstallmentsPagament: () => {
      if (!firstPurchaseAndInstallmentsPagament) return false;
      return purchaseIsAboveThousand
        ? "20%"
        : purchaseBetweenFiveHundredAndThousand && !purchaseIsBelowFiveHundred
        ? "15%"
        : "10%";
    },
    notFirstPurchaseAndCashPagament: () => {
      if (!notFirstPurchaseAndCashPagament) return false;
      return purchaseIsAboveThousand
        ? "20%"
        : purchaseBetweenFiveHundredAndThousand && !purchaseIsBelowFiveHundred
        ? "15%"
        : "10%";
    },
    notFirstPurchaseAndInstallmentsPagament: () => {
      if (!notFirstPurchaseAndInstallmentsPagament) return false;
      return purchaseIsAboveThousand
        ? "10%"
        : purchaseBetweenFiveHundredAndThousand && !purchaseIsBelowFiveHundred
        ? "5%"
        : "Sem desconto";
    },
  };

  const generateDiscount = Object.keys(conditions).reduce((acc, value) => {
    const discount = conditions[value](customerCondition);

    return !discount ? acc : (acc = discount);
  }, "");

  return generateDiscount;
}

console.log(discountGenerator(customerCondition));
