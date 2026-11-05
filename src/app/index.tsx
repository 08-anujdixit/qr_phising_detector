import "../../global.css";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import {
  StatusBar,
  Text,
  View,
  Pressable,
} from "react-native";

export default function Index() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState<string | null>(null);
  const locked = useRef(false);

  if (!permission) {
    return <View className="flex-1 bg-[#080B12]" />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-[#080B12] px-7">
        <StatusBar barStyle="light-content" />

        <Text className="text-2xl font-black tracking-widest text-white">
          QR Phishing Detector
        </Text>

        <Text className="mt-10 text-center text-2xl font-extrabold text-white">
          Camera Access Required
        </Text>

        <Text className="mt-3 text-center text-sm leading-6 text-[#8490A3]">
          Camera access is required to scan and inspect QR codes.
        </Text>

        <Pressable
          onPress={requestPermission}
          className="mt-7 rounded-lg bg-[#3678F6] px-8 py-3 active:opacity-80"
        >
          <Text className="font-bold text-white">Allow Camera</Text>
        </Pressable>
      </View>
    );
  }

  function handleScan({ data }: { data: string }) {
    if (locked.current) return;

    locked.current = true;
    setScanned(data);
  }

  function scanAgain() {
    locked.current = false;
    setScanned(null);
  }

  if (scanned) {
    return (
      <View className="flex-1 items-center justify-center bg-[#080B12] px-7">
        <StatusBar barStyle="light-content" />

        <Text className="text-2xl font-black tracking-widest text-white">
          QR Phishing Detector
        </Text>

        <View className="mt-8 flex-row items-center gap-2 rounded-full border border-[#26354C] px-4 py-2">
          <View className="h-2 w-2 rounded-full bg-[#3678F6]" />
          <Text className="text-xs font-bold tracking-widest text-[#91B5FF]">
            QR DETECTED
          </Text>
        </View>

        <Text className="mt-6 text-center text-2xl font-extrabold text-white">
          Scan Complete
        </Text>

        <Text className="mt-3 text-center text-sm leading-6 text-[#8490A3]">
          QR code content captured. Security inspection will be available here.
        </Text>

        <View className="mt-8 w-full rounded-xl border border-[#26354C] bg-[#111722] p-5">
          <Text className="mb-3 text-xs font-bold tracking-widest text-[#3678F6]">
            DETECTED CONTENT
          </Text>

          <Text className="text-sm leading-6 text-[#D5DEED]" selectable>
            {scanned}
          </Text>
        </View>

        <Pressable
          onPress={scanAgain}
          className="mt-7 rounded-lg bg-[#3678F6] px-8 py-4 active:opacity-80"
        >
          <Text className="font-bold text-white">
            Scan Another Code
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#080B12]">
      <StatusBar barStyle="light-content" backgroundColor="#080B12" />

      {/* Header */}
      <View className="flex-row items-center justify-between border-b border-[#1B2332] px-6 pb-5 pt-6">
        <View className="flex-1">
          <Text
            numberOfLines={1}
            className="text-xl font-black tracking-wide text-white"
          >
            QR Phishing Detector
          </Text>

          <Text className="mt-1 text-[9px] tracking-[2px] text-[#718096]">
            QR SECURITY SCANNER
          </Text>
        </View>

        <View className="ml-2 flex-row items-center gap-2 rounded-full border border-[#26354C] px-3 py-2">
          <View className="h-2 w-2 rounded-full bg-[#3678F6]" />

          <Text className="text-[10px] font-bold tracking-wider text-[#91B5FF]">
            READY
          </Text>
        </View>
      </View>

      {/* Main Content */}
      <View className="flex-1 justify-center px-6">
        <Text className="mb-3 text-[11px] font-bold tracking-[2px] text-[#3678F6]">
          SECURITY CHECK
        </Text>

        <Text className="text-4xl font-extrabold leading-[43px] text-white">
          Scan before{"\n"}you trust.
        </Text>

        <Text className="mb-7 mt-3 text-sm leading-[22px] text-[#8490A3]">
          Position a QR code inside the scanning area to inspect its destination.
        </Text>

        {/* Camera Scanner */}
        <View className="relative aspect-square w-full max-h-[340px] self-center overflow-hidden rounded-[18px] border border-[#26354C] bg-[#121824]">
          <CameraView
            style={{ flex: 1 }}
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
            onBarcodeScanned={handleScan}
          />

          {/* Scanner Corners */}
          <View className="pointer-events-none absolute inset-0">
            <View className="absolute left-4 top-4 h-8 w-8 rounded-tl-md border-l-[3px] border-t-[3px] border-[#3678F6]" />

            <View className="absolute right-4 top-4 h-8 w-8 rounded-tr-md border-r-[3px] border-t-[3px] border-[#3678F6]" />

            <View className="absolute bottom-4 left-4 h-8 w-8 rounded-bl-md border-b-[3px] border-l-[3px] border-[#3678F6]" />

            <View className="absolute bottom-4 right-4 h-8 w-8 rounded-br-md border-b-[3px] border-r-[3px] border-[#3678F6]" />
          </View>
        </View>

        <Text className="mt-5 text-center text-[10px] font-bold tracking-[1.5px] text-[#718096]">
          ALIGN QR CODE WITHIN THE FRAME
        </Text>
      </View>

      {/* Footer */}
      <View className="items-center px-6 pb-6">
        <View className="mb-4 h-px w-full bg-[#1B2332]" />

        <Text className="text-center text-[9px] tracking-[1.5px] text-[#566276]">
          PROTECT YOURSELF FROM QR-BASED THREATS
        </Text>
      </View>
    </View>
  );
}


