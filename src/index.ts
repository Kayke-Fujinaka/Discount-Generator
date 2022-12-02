enum PaymentType {
  installments = "installments",
  cash = "cash",
}

type CustomerConditionsProps = {
  isFirstPurchase: boolean;
  paymentType: PaymentType;
  purchaseValue: number;
};

const customerCondition: CustomerConditionsProps = {
  isFirstPurchase: false,
  paymentType: PaymentType.installments,
  purchaseValue: 700,
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
  const purchaseIsEqualsOrAboveFiveHundredAndIsEqualsOrBelowThousand =
    purchaseValue >= 500 && purchaseValue <= 1000;

  const conditions: any = {
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
        : purchaseIsEqualsOrAboveFiveHundredAndIsEqualsOrBelowThousand &&
          !purchaseIsBelowFiveHundred
        ? "15%"
        : "10%";
    },
    notFirstPurchaseAndCashPagament: () => {
      if (!notFirstPurchaseAndCashPagament) return false;
      return purchaseIsAboveThousand
        ? "20%"
        : purchaseIsEqualsOrAboveFiveHundredAndIsEqualsOrBelowThousand &&
          !purchaseIsBelowFiveHundred
        ? "15%"
        : "10%";
    },
    notFirstPurchaseAndInstallmentsPagament: () => {
      if (!notFirstPurchaseAndInstallmentsPagament) return false;
      return purchaseIsAboveThousand
        ? "10%"
        : purchaseIsEqualsOrAboveFiveHundredAndIsEqualsOrBelowThousand &&
          !purchaseIsBelowFiveHundred
        ? "5%"
        : "Sem desconto";
    },
  };

  const generateDiscount = Object.keys(conditions).reduce((acc, value) => {
    const discount = conditions[value](customerCondition);

    return !discount ? acc : (acc = discount);
  }, 0);

  return generateDiscount;
}

console.log(discountGenerator(customerCondition));
