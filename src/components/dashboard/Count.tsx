"use client";

import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";
import CountUp from "react-countup";

function Count({
  value,
  isPrice = false,
}: {
  value: number;
  isPrice?: boolean;
}) {
  return (
    <CountUp
      start={0}
      end={value}
      duration={1}
      formattingFn={(num) =>
        isPrice ? digitsEnToFa(addCommas(num)) : digitsEnToFa(num)
      }
    />
  );
}

export default Count;
