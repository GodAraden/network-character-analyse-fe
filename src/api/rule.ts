import axios from 'axios';
import qs from 'query-string';

export interface BaseInfoModel {
  name: string;
  base: string;
  depth: number;
}

export interface RuleItem {
  name: string;
  order: number;
  path: string;
  resolve: string;
  parameter: string;
}

export type RuleRecord = BaseInfoModel & { id: string; rules: RuleItem[] };

export type CreateRuleReq = BaseInfoModel & { rules: RuleItem[] };
export type CreateRuleRes = { id: string };

export async function createRule(params: CreateRuleReq) {
  const { data } = await axios.post<CreateRuleRes>('/api/rule/create', params);
  return data;
}

export type UpdateRuleReq = Partial<RuleRecord>;
export type UpdateRuleRes = boolean;

export async function updateRule(params: UpdateRuleReq) {
  const { data } = await axios.post<UpdateRuleRes>('/api/rule/update', params);
  return data;
}

export interface FetchRuleListReq extends Partial<RuleRecord> {
  current: number;
  pageSize: number;
}

export interface FetchRuleListRes {
  list: RuleRecord[];
  total: number;
}

export function fetchRuleList(params: FetchRuleListReq) {
  return axios.get<FetchRuleListRes>('/api/rule/list', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export interface FetchRuleInfoReq {
  id: string;
}

export type FetchRuleInfoRes = RuleRecord;

export function fetchRuleInfo(params: FetchRuleInfoReq) {
  return axios.get<FetchRuleInfoRes>('/api/rule/info', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
