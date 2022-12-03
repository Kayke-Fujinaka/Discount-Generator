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
  isFirstPurchase: false,
  paymentType: PaymentType.installments,
  purchaseValue: 1600,
};

function discountGenerator({
  isFirstPurchase,
  paymentType,
  purchaseValue,
}: CustomerConditionsProps) {
  const purchaseIsAboveThousand = purchaseValue > 1000;
  const purchaseIsBelowThousand = purchaseValue < 1000;
  const purchaseIsBelowFiveHundred = purchaseValue < 500;
  const purchaseBetweenFiveHundredAndThousand =
    purchaseValue >= 500 && purchaseValue <= 1000;

  const conditions: Conditions = {
    firstPurchaseAndCashPayment: () => {
      if (!(isFirstPurchase === true && paymentType === "cash")) return false;
      if (purchaseIsAboveThousand) return "30%";
      return purchaseIsBelowThousand && !purchaseIsBelowFiveHundred
        ? "25%"
        : "20%";
    },
    firstPurchaseAndInstallmentsPayment: () => {
      if (!(isFirstPurchase === true && paymentType === "installments"))
        return false;
      if (purchaseIsAboveThousand) return "20%";
      return purchaseBetweenFiveHundredAndThousand &&
        !purchaseIsBelowFiveHundred
        ? "15%"
        : "10%";
    },
    notFirstPurchaseAndCashPayment: () => {
      if (!(isFirstPurchase === false && paymentType === "cash")) return false;
      if (purchaseIsAboveThousand) return "20%";
      return purchaseBetweenFiveHundredAndThousand &&
        !purchaseIsBelowFiveHundred
        ? "15%"
        : "10%";
    },
    notFirstPurchaseAndInstallmentsPayment: () => {
      if (!(isFirstPurchase === false && paymentType === "installments"))
        return false;
      if (purchaseIsAboveThousand) return "10%";
      return purchaseBetweenFiveHundredAndThousand &&
        !purchaseIsBelowFiveHundred
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
