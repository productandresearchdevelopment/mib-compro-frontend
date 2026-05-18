import { useState, useCallback } from "react";

export interface IPaginateFilters {
  searchInput: string;
  searchTerm: string;

  selectedTime: string;
  selectedRole: string;
  selectedStatus: string;
  selectedDevice: string;
  selectedClient: string;
  selectedQuartal: string;
  selectedRecurring: string;
  selectedLeadStatus: string;
  selectedSalesUser: string;
  selectedCategory: string;

  selectedMonth: string;
  selectedYear: string;

  pageSize: number;
  startDate: string;
  endDate: string;
  currentPage: number;

  setSearchInput: (value: string) => void;
  setSearchTerm: (value: string) => void;

  setSelectedTime: (value: string) => void;
  setSelectedRole: (value: string) => void;
  setSelectedStatus: (value: string) => void;
  setSelectedDevice: (value: string) => void;
  setSelectedClient: (value: string) => void;
  setSelectedQuartal: (value: string) => void;
  setSelectedRecurring: (value: string) => void;
  setSelectedLeadStatus: (value: string) => void;
  setSelectedSalesUser: (value: string) => void;
  setSelectedCategory: (value: string) => void;

  setSelectedMonth: (value: string) => void;
  setSelectedYear: (value: string) => void;

  setPageSize: (value: number) => void;
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
  setCurrentPage: (value: number) => void;

  resetFilters: () => void;
}

export const usePaginateFilters = (): IPaginateFilters => {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedTime, setSelectedTime] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDevice, setSelectedDevice] = useState("all");
  const [selectedClient, setSelectedClient] = useState("all");
  const [selectedQuartal, setSelectedQuartal] = useState("all");
  const [selectedRecurring, setSelectedRecurring] = useState("all");
  const [selectedLeadStatus, setSelectedLeadStatus] = useState("all");
  const [selectedSalesUser, setSelectedSalesUser] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  const [pageSize, setPageSize] = useState(5);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchInput = useCallback((value: string) => {
    setSearchInput(value);
  }, []);

  const handleSearchTerm = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const resetPage = () => setCurrentPage(1);

  const handleSelectedTime = useCallback((value: string) => {
    setSelectedTime(value);
    resetPage();
  }, []);

  const handleSelectedRole = useCallback((value: string) => {
    setSelectedRole(value);
    resetPage();
  }, []);

  const handleSelectedStatus = useCallback((value: string) => {
    setSelectedStatus(value);
    resetPage();
  }, []);

  const handleSelectedDevice = useCallback((value: string) => {
    setSelectedDevice(value);
    resetPage();
  }, []);

  const handleSelectedClient = useCallback((value: string) => {
    setSelectedClient(value);
    resetPage();
  }, []);

  const handleSelectedQuartal = useCallback((value: string) => {
    setSelectedQuartal(value);
    resetPage();
  }, []);

  const handleSelectedRecurring = useCallback((value: string) => {
    setSelectedRecurring(value);
    resetPage();
  }, []);

  const handleSelectedLeadStatus = useCallback((value: string) => {
    setSelectedLeadStatus(value);
    resetPage();
  }, []);

  const handleSelectedSalesUser = useCallback((value: string) => {
    setSelectedSalesUser(value);
    resetPage();
  }, []);

  const handleSelectedCategory = useCallback((value: string) => {
    setSelectedCategory(value);
    resetPage();
  }, []);

  const handleSelectedMonth = useCallback((value: string) => {
    setSelectedMonth(value);
    resetPage();
  }, []);

  const handleSelectedYear = useCallback((value: string) => {
    setSelectedYear(value);
    resetPage();
  }, []);

  const handlePageSize = useCallback((value: number) => {
    setPageSize(value);
    resetPage();
  }, []);

  const handleStartDate = useCallback((value: string) => {
    setStartDate(value);
    resetPage();
  }, []);

  const handleEndDate = useCallback((value: string) => {
    setEndDate(value);
    resetPage();
  }, []);

  const resetFilters = useCallback(() => {
    setSearchInput("");
    setSearchTerm("");

    setSelectedTime("all");
    setSelectedRole("all");
    setSelectedStatus("all");
    setSelectedDevice("all");
    setSelectedClient("all");
    setSelectedQuartal("all");
    setSelectedRecurring("all");
    setSelectedLeadStatus("all");
    setSelectedSalesUser("all");
    setSelectedCategory("all");

    setSelectedMonth("all");
    setSelectedYear("all");

    setPageSize(5);
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
  }, []);

  return {
    searchInput,
    searchTerm,

    selectedTime,
    selectedRole,
    selectedStatus,
    selectedDevice,
    selectedClient,
    selectedQuartal,
    selectedRecurring,
    selectedLeadStatus,
    selectedSalesUser,
    selectedCategory,

    selectedMonth,
    selectedYear,

    pageSize,
    startDate,
    endDate,
    currentPage,

    setSearchInput: handleSearchInput,
    setSearchTerm: handleSearchTerm,

    setSelectedTime: handleSelectedTime,
    setSelectedRole: handleSelectedRole,
    setSelectedStatus: handleSelectedStatus,
    setSelectedDevice: handleSelectedDevice,
    setSelectedClient: handleSelectedClient,
    setSelectedQuartal: handleSelectedQuartal,
    setSelectedRecurring: handleSelectedRecurring,
    setSelectedLeadStatus: handleSelectedLeadStatus,
    setSelectedSalesUser: handleSelectedSalesUser,
    setSelectedCategory: handleSelectedCategory,

    setSelectedMonth: handleSelectedMonth,
    setSelectedYear: handleSelectedYear,

    setPageSize: handlePageSize,
    setStartDate: handleStartDate,
    setEndDate: handleEndDate,
    setCurrentPage,

    resetFilters,
  };
};
