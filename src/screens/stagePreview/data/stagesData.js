import { 
  FaSeedling,
  FaHandHoldingHeart,
  FaBox, 
  FaShip, 
  FaAnchor,
  FaWarehouse,
  FaStore,
} from "react-icons/fa";

/**
 * Data for all stages in the avocado traceability process
 * @type {Array<Object>}
 */
const stagesData = [
  {
    id: 1,
    name: "Farm Inspection",
    icon: FaSeedling,
    phase: "Origin Phase",
    location: "Nairobi, Kenya",
    mapUrl: "https://a.tile.openstreetmap.org/10/600/423.png",
    summaryItems: [
      { label: "Initial inspection of avocado farms", value: "25 acres", suffix: "inspected" },
      { label: "Verification of PUC Code", value: "KE-215", suffix: "Lot #AVK-2203" },
      { label: "Soil pH level", value: "6.5-7.2", suffix: "optimal range" },
      { label: "Batch tagging with", value: "98%", suffix: "traceability compliance" }
    ],
    qualityChecks: [
      { label: "Dry Matter", value: "23.4%", suffix: "(Target: >23%)" },
      { label: "Fruit Pressure", value: "8.2 kg/cm²", suffix: "(Standard: 8-10)" },
      { label: "Visual Defect Rate", value: "< 2%", suffix: "of sampled fruit" }
    ]
  },
  {
    id: 2,
    name: "Harvest & Post-Harvest",
    icon: FaHandHoldingHeart,
    phase: "Harvesting",
    location: "Nairobi, Kenya",
    mapUrl: "https://a.tile.openstreetmap.org/10/600/423.png",
    summaryItems: [
      { label: "Handpicking & Sorting", value: "4.8 tons", suffix: "harvested" },
      { label: "Cleaning & Pre-cooling to", value: "12°C", suffix: "for freshness" },
      { label: "Packaging", value: "1,200 units", suffix: "in 4KG boxes" }
    ],
    qualityChecks: [
      { label: "Size Distribution", value: "85% Grade A", suffix: "(170-210g per fruit)" },
      { label: "Moisture Content", value: "72%", suffix: "(Target: 70-75%)" },
      { label: "Defect Rejection Rate", value: "3.2%", suffix: "of total harvest" }
    ]
  },
  {
    id: 3,
    name: "Pre-Shipment Inspection",
    icon: FaBox,
    phase: "Pre-Export",
    location: "Nairobi, Kenya",
    mapUrl: "https://a.tile.openstreetmap.org/10/600/423.png",
    summaryItems: [
      { label: "Quality inspection", value: "100%", suffix: "of pallets checked" },
      { label: "Packaging verified", value: "1,200 boxes", suffix: "labeled" },
      { label: "QR Code reliability", value: "99.8%", suffix: "scan success rate" }
    ],
    qualityChecks: [
      { label: "Dry Matter", value: "24.1%", suffix: "(increased from initial check)" },
      { label: "Ripeness Index", value: "2.1", suffix: "on 1-5 scale (ideal for shipping)" },
      { label: "Packaging Integrity", value: "100%", suffix: "compliance rate" }
    ]
  },
  {
    id: 4,
    name: "Export & Transit",
    icon: FaShip,
    phase: "Transit Phase",
    location: "Kenya → Dubai",
    mapUrl: "https://a.tile.openstreetmap.org/5/20/13.png",
    summaryItems: [
      { label: "Shipment loaded", value: "48 pallets", suffix: "on 2/3/2025" },
      { label: "Sea freight transit", value: "8 days", suffix: "journey time" },
      { label: "Tracking frequency", value: "hourly", suffix: "data updates" },
      { label: "Container", value: "MSCU7542198", suffix: "AWB: 023-84742545" }
    ],
    qualityChecks: [
      { label: "Temperature Range", value: "4.8-6.2°C", suffix: "(Target: 4-7°C)" },
      { label: "Humidity Levels", value: "85-92%", suffix: "throughout transit" },
      { label: "Shock Events", value: "2 minor", suffix: "incidents recorded" }
    ]
  },
  {
    id: 5,
    name: "Port Arrival & Customs",
    icon: FaAnchor,
    phase: "Destination Arrival",
    location: "Dubai",
    mapUrl: "https://a.tile.openstreetmap.org/9/341/233.png",
    summaryItems: [
      { label: "Arrival", value: "On-time", suffix: "on 2/11/2025" },
      { label: "Port", value: "Dubai", suffix: "Berth #7" },
      { label: "Customs processing", value: "4.5 hours", suffix: "" },
      { label: "Cold-chain transfer", value: "< 30 min", suffix: "" }
    ],
    qualityChecks: [
      { label: "Arrival Temperature", value: "5.3°C", suffix: "(within specification)" },
      { label: "Visual Inspection", value: "98.5%", suffix: "acceptable appearance" }
    ]
  },
  {
    id: 6,
    name: "Warehouse Inspection",
    icon: FaWarehouse,
    phase: "Processing",
    location: "TFC Warehouse, Dubai",
    mapUrl: "https://a.tile.openstreetmap.org/9/341/233.png",
    summaryItems: [
      { label: "Warehouse intake", value: "48 pallets", suffix: "on 2/12/2025" },
      { label: "Storage conditions", value: "6°C, 90%", suffix: "humidity" },
      { label: "Quality sample size", value: "15%", suffix: "of shipment" }
    ],
    qualityChecks: [
      { label: "Dry Matter", value: "24.5%", suffix: "(within 0.5% of pre-shipment)" },
      { label: "Visual Quality Score", value: "4.6/5.0", suffix: "after transit" },
      { label: "Net Weight Verification", value: "99.7%", suffix: "accuracy" }
    ]
  },
  {
    id: 7,
    name: "Final Distribution",
    icon: FaStore,
    phase: "Final Delivery",
    location: "Dubai Retailers",
    mapUrl: "https://a.tile.openstreetmap.org/9/341/233.png",
    summaryItems: [
      { label: "Distribution", value: "65%", suffix: "supermarkets, 35% restaurants" },
      { label: "Freshness protocol", value: "100%", suffix: "FIFO adherence" },
      { label: "Consumer engagement", value: "312", suffix: "QR code scans" }
    ],
    qualityChecks: [
      { label: "Final Ripeness Score", value: "3.2/5.0", suffix: "(ready for retail)" },
      { label: "Cold-Chain Maintenance", value: "Zero breaks", suffix: "in temperature control" },
      { label: "Retailer Acceptance Rate", value: "99.2%", suffix: "of delivered product" }
    ]
  }
];

export default stagesData; 