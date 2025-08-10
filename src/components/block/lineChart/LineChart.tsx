import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { SelectDemo } from "../select/Select";

// 1. Sesuaikan data agar sesuai dengan rentang 0-40
const chartData = [
  { month: "January", stunting: 11 },
  { month: "February", stunting: 13 },
  { month: "March", stunting: 8 },
  { month: "April", stunting: 17 },
  { month: "May", stunting: 29 },
  { month: "June", stunting: 16 },
];

const chartConfig = {
  stunting: {
    label: "Jumlah Stunting",
    color: "#0F828C", // Menggunakan warna teal
  },
} satisfies ChartConfig;

export function ChartLineStunting() {
  return (
    <Card className="py-6">
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle className="text-muted-foreground">STATISTIK</CardTitle>
          <CardTitle className="text-2xl">DATA STUNTING</CardTitle>
        </div>

        <div>
          <SelectDemo />
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 10,
              left: -10,
              right: 10,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              // 2. Tambahkan properti 'ticks' untuk menentukan angka pada sumbu Y
              ticks={[0, 10, 20, 30, 40]}
              domain={[0, 40]} // Atur domain agar skala maksimal adalah 40
            />
            <ChartTooltip
              cursor={true}
              content={
                <ChartTooltipContent
                  formatter={(value) => `Total : ${value}`}
                  indicator="dot"
                  labelClassName="font-bold"
                />
              }
            />
            <Line
              dataKey="stunting"
              type="monotone"
              stroke="var(--color-stunting)"
              strokeWidth={2}
              dot={{
                r: 6,
                fill: "var(--color-stunting)",
                stroke: "#FFFFFF",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
