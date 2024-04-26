import axios from 'axios';

export interface BaseInfoModel {
  name: string;
  base: string;
  depth: number;
}

export interface RuleItem {
  id?: string;
  name: string;
  method: string;
  order: number;
  path: string;
  resolve: string;
  parameter: string;
  ruleId?: string;
}

export type RuleRecord = BaseInfoModel & { id?: string; rules: RuleItem[] };

export type CreateRuleReq = BaseInfoModel & { rules: RuleItem[] };
export type CreateRuleRes = { id: string };

export async function createRule(params: CreateRuleReq) {
  const { data } = await axios.post<CreateRuleRes>('/api/rule/create', params);
  return data;
}

export type UpdateRuleReq = Partial<RuleRecord>;
export type UpdateRuleRes = boolean;

export async function updateRule(params: UpdateRuleReq) {
  const { id, ...rest } = params;
  const { data } = await axios.patch<UpdateRuleRes>(`/api/rule/${id}`, rest);
  return data;
}

export interface FetchRuleListReq {
  keyword?: string;
  current?: number;
  pageSize?: number;
}

export interface FetchRuleListRes {
  list: RuleRecord[];
  total: number;
}

export function fetchRuleList(params: FetchRuleListReq) {
  return axios.post<FetchRuleListRes>('/api/rule/list', params);
}

export interface FetchRuleInfoReq {
  id: string;
}

export type FetchRuleInfoRes = RuleRecord;

export function fetchRuleInfo(params: FetchRuleInfoReq) {
  return axios.get<FetchRuleInfoRes>(`/api/rule/${params.id}`);
}

export interface DeleteRuleReq {
  id: string;
}

export interface DeleteRuleRes {
  id: string;
}

export async function deleteRule(params: DeleteRuleReq) {
  const { data } = await axios.delete(`/api/rule/${params.id}`);
  return data;
}
